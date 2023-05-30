import { Request, Response, NextFunction } from "express";
import {
  checkPasswordSevice,
  createNewUserService,
  findUserByEmailService,
  setNewPasswordService,
} from "../services/user.services";
import generateToken from "../utils/token";

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

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: "please provide the user email and password",
      });
    }

    const user = await findUserByEmailService(email);

    if (!user) {
      return res.status(400).json({ success: false, msg: "user not found" });
    }

    const isPasswordValid = await checkPasswordSevice(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, msg: "Passwoed not match!" });
    }

    const token = generateToken(email);

    res.status(200).json({
      success: true,
      msg: "Successfully logged in",
      result: {
        email: user.email,
        name: user.name,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, msg: "login failed" });
  }
};

const forgotpassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const user = await findUserByEmailService(email);

    if (!user) {
      return res.status(400).json({ success: false, msg: "user not found" });
    }

    const securityQuestion: string = user?.securityQuestion?.question;

    res
      .status(200)
      .json({ success: true, msg: "user found", result: { securityQuestion } });
  } catch (error) {
    res.status(400).json({ success: false, msg: "user not found" });
  }
};

const setNewPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, ans, password, confirmPassword } = req.body;

    const user = await findUserByEmailService(email);

    if (!user) {
      return res.status(400).json({ success: false, msg: "user not found" });
    }

    if (user.securityQuestion.ans !== ans) {
      return res
        .status(400)
        .json({ success: false, msg: "your answer is incorrect." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        msg: "password and confirm password doesn't match",
      });
    }

    const result = await setNewPasswordService(email, password);

    if (!result) {
      return res.status(400).json({
        success: false,
        msg: "password not updated",
      });
    }

    res.status(200).json({ success: true, msg: "password updated" });
  } catch (error) {
    res.status(400).json({ success: false, msg: "user not found" });
  }
};

export { createNewUser, login, forgotpassword, setNewPassword };
