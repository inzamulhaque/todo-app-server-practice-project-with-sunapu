import {
  createNewUser,
  forgotpassword,
  login,
} from "../controllers/user.controller";
import express from "express";
const router = express.Router();

router.post("/createuser", createNewUser);

router.post("/login", login);

router.post("/forgotpassword", forgotpassword);

export default router;
