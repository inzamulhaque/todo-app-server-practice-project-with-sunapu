import { Request, Response, NextFunction } from "express";
import {
  createNewUserService,
  findUserByEmailService,
} from "../services/user.services";

const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      securityQuestion,
      securityAns,
    } = req.body;
    

    const user = await findUserByEmailService(email);

    if (user) {
      return res
        .status(400)
        .json({ success: false, msg: "user already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        msg: "password and confirm password doesn't match",
      });
    }

    const result = await createNewUserService(
      name,
      email,
      password,
      securityQuestion,
      securityAns
    );

    if (!result) {
      return res.status(400).json({ success: false, msg: "user not created" });
    }

    res.status(201).json({ success: true, msg: "user created", result });
  } catch (error) {    
    res.status(400).json({ success: false, msg: "user not created" });
  }
};

export { createNewUser };
