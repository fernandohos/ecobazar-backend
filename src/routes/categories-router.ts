import { Router } from "express";
import categoriesController from "../controllers/categories-controller";

const router = Router();

router.get("/categories", categoriesController.getCategories);

export { router };
