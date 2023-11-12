import { Request, Response } from "express";
import productsModel, { FiltersType } from "../models/products-model";
import dotenv from "dotenv";
dotenv.config();

async function getFilteredProducts(req: Request, res: Response) {
  const {
    category,
    min_price = 0,
    max_price = 9999,
    tags,
    page = 1,
    page_size = 16,
  } = req.query;
  const page_offset = (Number(page) - 1) * Number(page_size);

  const filters = {
    category,
    min_price,
    max_price,
    tags,
    page_size,
    page_offset,
  } as FiltersType;

  try {
    const responseProducts = await productsModel.getProducts(filters);

    res
      .status(200)
      .json({ message: "products fetched succesffully", ...responseProducts });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ error: "Erro ao buscar produtos." });
  }
}

export default { getFilteredProducts };
