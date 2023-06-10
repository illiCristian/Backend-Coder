import { Router } from "express";
import ProductManager from "../Manager/productManager.js";
const router = Router();

const manager = new ProductManager();

router.get("/", async (req, res) => {
  const allProducts = await manager.getProducts();
  res.render("home", { title: "Productos", products: allProducts });
});
router.get("/realtimeproducts", async (req, res) => {
  const allProducts = await manager.getProducts();
  res.render("realtimeproducts", { title: "Productos", products: allProducts });
});

export default router;
