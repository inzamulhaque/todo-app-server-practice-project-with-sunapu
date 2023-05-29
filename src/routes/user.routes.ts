import { createNewUser, login } from "../controllers/user.controller";
import express from "express";
const router = express.Router();

router.post("/createuser", createNewUser);

router.post("/login", login);

export default router;
