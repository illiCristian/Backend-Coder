import { Router } from "express";
import ProductController from "../controllers/products.controller.js";

const router = Router();
const productsController = new ProductController();

router.get("/", productsController.mockingProducts);

export default router;
