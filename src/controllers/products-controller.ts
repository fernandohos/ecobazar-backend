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
    search,
  } = req.query;

  if (search) {
    try {
      const queryResponse = await productsModel.searchProducts(String(search));

      return res.status(200).json(queryResponse);
    } catch (error) {
      console.error("Error while searching products: ", error);
      return res
        .status(500)
        .json({ message: "Internal Server Error while searching products" });
    }
  }

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

    return res.status(200).json(responseProducts);
  } catch (error) {
    console.error("Error while filtering products: ", error);
    res
      .status(500)
      .json({ message: "Internal Server Error while filtering products" });
  }
}

export default { getFilteredProducts };
