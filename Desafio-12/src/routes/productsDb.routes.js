import { Router } from "express";
import ProductController from "../controllers/products.controller.js";
import { adminAcces, privateAcces } from "../middlewares/userMiddleware.js";

const router = Router();
const productController = new ProductController();

router.get("/", productController.getAllProducts);
router.get(
  "/products",
  privateAcces,
  //adminacces
  productController.getProducts
);
router.get("/:id", productController.getProductById);
router.post("/", privateAcces, adminAcces, productController.createProduct);
router.put("/:id", privateAcces, adminAcces, productController.updateProduct);
router.delete(
  "/:id",
  privateAcces,
  adminAcces,
  productController.deleteProduct
);

export default router;
