import { Request, Response } from "express";
import { findUserByEmailService } from "../user/user.services";
import { createCategoryServices } from "./categories.services";

export const addNewCategory = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { cat } = req.body;

    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "user is not logged in" });
    }

    const fullUser = await findUserByEmailService(user.email);

    if (!fullUser) {
      return res.status(400).json({ success: false, msg: "user not found" });
    }

    const addCategory = await createCategoryServices(fullUser, cat);

    if (!addCategory) {
      return res
        .status(400)
        .json({ success: false, msg: "category not added" });
    }

    const { password, ...result } = addCategory.toObject();

    res.status(201).json({ success: true, msg: "category added", result });
  } catch (error) {
    res.status(400).json({ success: false, msg: "user is not logged in" });
  }
};
