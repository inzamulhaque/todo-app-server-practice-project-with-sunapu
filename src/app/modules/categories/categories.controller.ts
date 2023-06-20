import { Request, Response } from "express";
import { findUserByEmailService } from "../user/user.services";
import {
  createCategoryServices,
  deleteCatServices,
  updateCatNameService,
} from "./categories.services";

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

export const getAllCat = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "user is not logged in" });
    }

    const fullUser = await findUserByEmailService(user.email);

    if (!fullUser) {
      return res.status(400).json({ success: false, msg: "user not found" });
    }

    res.status(200).json({
      success: true,
      msg: "categories found",
      result: (fullUser as any).categories,
    });
  } catch (error) {
    res.status(400).json({ success: false, msg: "user is not logged in" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { oldCatName, newCatName } = req.body;

    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "user is not logged in" });
    }

    const fullUser = await findUserByEmailService(user.email);

    if (!fullUser) {
      return res.status(400).json({ success: false, msg: "user not found" });
    }

    const result = await updateCatNameService(fullUser, oldCatName, newCatName);

    if (!result) {
      return res
        .status(400)
        .json({ success: false, msg: "category name not updated" });
    }

    const { password, ...newResult } = result.toObject();

    res
      .status(200)
      .json({ success: true, msg: "category name updated", result: newResult });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, msg: "user is not logged in" });
  }
};

export const deleteCat = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { cat } = req.body;

    if (!cat) {
        return res
          .status(400)
          .json({ success: false, msg: "category not deleted" });
      }

    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "user is not logged in" });
    }

    const fullUser = await findUserByEmailService(user.email);

    if (!fullUser) {
      return res.status(400).json({ success: false, msg: "user not found" });
    }

    const deleteCat = await deleteCatServices(fullUser, cat);

    if (!deleteCat) {
      return res
        .status(400)
        .json({ success: false, msg: "category not deleted" });
    }

    const { password, ...result } = deleteCat.toObject();

    res
      .status(400)
      .json({ success: true, msg: "category not deleted", result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, msg: "user is not logged in" });
  }
};
