import { Request, Response } from "express";
import categoriesModel from "../models/categories-model";

async function getCategories(req: Request, res: Response) {
  try {
    const categories = await categoriesModel.getCategories();

    return res.status(200).json(categories);
  } catch (error) {
    console.error("Error while getting categories: ", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error while getting categories" });
  }
}

export default { getCategories };
