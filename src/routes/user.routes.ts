import { createNewUser } from "../controllers/user.controller";
import express from "express";
const router = express.Router();

router.post("/createuser",createNewUser)

export default router