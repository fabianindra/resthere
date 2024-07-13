import { verify } from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';

const verifyToken = (token: string, secret: string): any => {
  return verify(token, secret);
};

export const serviceVerifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '').trim();

    if (!token) {
      return res.status(401).json({ message: 'Invalid token, unauthorized' });
    }

    const verifiedUser = verifyToken(token, process.env.JWT_SECRET!);
    if (!verifiedUser) {
      return res.status(401).json({ message: 'Expired token' });
    }

    req.user = verifiedUser;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Verification error',
      error: (error as Error).message,
    });
  }
};
