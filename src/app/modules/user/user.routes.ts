import {
  createNewUser,
  forgotpassword,
  login,
  setNewPassword,
} from "./user.controller";
import express from "express";
const router = express.Router();

router.post("/createuser", createNewUser);

router.post("/login", login);

router.post("/forgotpassword", forgotpassword);

router.patch("/setnewpassword", setNewPassword);

export default router;
