import { verify } from "jsonwebtoken";

// Token verification function
const verifyToken = (token: string, secret: string): any => {
  return verify(token, secret);
};

// Token verification middleware
export const serviceVerifyToken = async (request: any, next: any) => {
  try {
    const token = request.header("Authorization")?.replace("Bearer ", "").trim();

    if (!token) {
      return {
        status: 401,
        message: "Invalid token, unauthorized",
      };
    }

    const verifiedUser = verifyToken(token, "keyOFkey");
    if (!verifiedUser) {
      return {
        status: 401,
        message: "Expired token",
      };
    }

    request.user = verifiedUser;

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
