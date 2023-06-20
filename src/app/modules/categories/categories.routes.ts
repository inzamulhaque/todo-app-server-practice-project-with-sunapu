import express from "express";
import verifyToken from "../user/user.middleware";
import { addNewCategory } from "./categories.controller";
const router = express.Router();

router.post("/createcat", verifyToken, addNewCategory);

export default router;
