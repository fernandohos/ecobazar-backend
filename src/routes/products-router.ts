import { Router } from "express";
import productsController from "../controllers/products-controller";

const router = Router();

router.get("/products", productsController.getFilteredProducts);


export { router };
