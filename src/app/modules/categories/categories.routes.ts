import express from "express";
import verifyToken from "../user/user.middleware";
import { addNewCategory, getAllCat, updateCategory } from "./categories.controller";
const router = express.Router();

router
  .get("/getallcat", verifyToken, getAllCat)
  .post("/createcat", verifyToken, addNewCategory)
  .patch("/updatecat", verifyToken, updateCategory);

export default router;
