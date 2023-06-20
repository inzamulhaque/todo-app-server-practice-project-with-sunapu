import { Request, Response, NextFunction } from "express";
import jwt, { VerifyCallback } from "jsonwebtoken";
import { promisify } from "util";

const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];
    if (!token) {
      res.status(401).send({
        status: false,
        error: "You are not logged in",
      });
      return;
    }

    const verifyAsync = promisify(jwt.verify) as (token: string, secretOrPublicKey: jwt.Secret, callback?: VerifyCallback) => Promise<any>;
    const decoded = await verifyAsync(token, process.env.TOKEN_KEY);

    (req as any).user = decoded;

    next();
  } catch (error) {
    res.status(403).json({
      status: false,
      error: "Invalid token",
    });
  }
};

export default verifyToken;
