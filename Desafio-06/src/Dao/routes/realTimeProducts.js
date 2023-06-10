import { Router } from "express";
import ProductManager from "../Manager/productManager.js";
const manager = new ProductManager();
const router = Router();
const realTimeProducts = Router();

router.get("/realtimeproducts", async (req, res) => {
  const allProducts = await manager.getProducts();
  res.render("realtimeproducts", { title: "Productos", products: allProducts });
});
export default realTimeProducts;
