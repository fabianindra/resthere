  import { genSalt, hash, compare } from "bcrypt";
  import {
    repoAddTenant,
    repoAddUser,
    repoFindTenant,
    repoFindUser,
  } from "../repository/auth.repository";
  import { sign, verify } from "jsonwebtoken";
  
  type User = {
    id: number;
    email: string;
    username: string;
    password: string; 
  };
  
  type Tenant = {
    id: number;
    email: string;
    username: string;
    password: string; 
  };
  
  type UserModel = Omit<User, 'password'> & {
    password: string;
    createdAt: Date;
    updatedAt: Date;
  };
  
  type TenantModel = Omit<Tenant, 'password'> & {
    password: string;
    createdAt: Date;
    updatedAt: Date;
  };
  
  
  export const serviceRegisterUser = async (request: User) => {
    try {
      const existingUser: any = await repoFindUser(request.email);
  
      if (existingUser) {
        return {
          status: 401,
          success: false,
          message: "email already registered",
        };
      }
  
      const salt = await genSalt(10);
      const hashedPassword = await hash(request.password, salt);
      console.log(hashedPassword, "password-reg");
      await repoAddUser(
        request.username,
        request.email,
        hashedPassword,
      );
  
      return {
        status: 201,
        success: true,
        message: "register successfully",
        data: request,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: "server error",
        error: (error as Error).message,
      };
    }
  };
  
  export const serviceRegisterTenant = async (request: User) => {
    try {
      const existingTenant: any = await repoFindTenant(request.email);
  
      if (existingTenant) {
        return {
          status: 401,
          success: false,
          message: "email already registered",
        };
      }
  
      const salt = await genSalt(10);
      const hashedPassword = await hash(request.password, salt);
      console.log(hashedPassword, "password-reg");
      await repoAddTenant(
        request.username,
        request.email,
        hashedPassword,
      );
  
      return {
        status: 201,
        success: true,
        message: "register successfully",
        data: request,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: "server error",
        error: (error as Error).message,
      };
    }
  };

  export const serviceLogin = async (request: any) => {
    const { email, password }: { email: string; password: string } = request;
    try {
      const existingUser: any = await repoFindUser(email);
      const existingTenant: any = await repoFindTenant(email);
  
      if (!existingUser && !existingTenant) {
        return {
          status: 401,
          success: false,
          message: "invalid email or password",
        };
      }
  
      if (existingUser) {
        const isValidPasswordUser = await compare(password, existingUser.password);
        if (isValidPasswordUser) {
          const jwtPayload = { email, userType: 'user' };
          const token = sign(jwtPayload, 'keyOFkey', { expiresIn: '1h' });
          delete existingUser.password;
          return {
            status: 201,
            success: true,
            message: "login successfully",
            data: existingUser,
            token: token,
            role: "user"
          };
        }
      }
  
      if (existingTenant) {
        const isValidPasswordTenant = await compare(password, existingTenant.password);
        if (isValidPasswordTenant) {
          const jwtPayload = { email, userType: 'tenant' };
          const token = sign(jwtPayload, 'keyOFkey', { expiresIn: '1h' });
          delete existingTenant.password;
          return {
            status: 201,
            success: true,
            message: "login successfully",
            data: existingTenant,
            token: token,
            role: "tenant"
          };
        }
      }
  
      return {
        status: 401,
        success: false,
        message: "invalid email or password",
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: "server error",
        error: (error as Error).message,
      };
    }
  };
  
  export const serviceVerifyToken = async (request: any, next: any) => {
    try {
      const token = request.header("Authorization")?.replace("Bearer ", "").trim();
  
      if (!token) {
        return {
          status: 401,
          message: "invalid token, unauthorized",
        };
      }
  
      const verifiedUser = verify(token, "keyOFkey");
      if (!verifiedUser) {
        return {
          status: 401,
          message: "expired token",
        };
      }
  
      request.user = verifiedUser as User;
  
      next();
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: "Register Error",
        error: (error as Error).message,
      };
    }
  };
  