import { Router } from "express";
import ProductManager from "../Manager/productManager.js";

const manager = new ProductManager();
const router = Router();
const realTimeProducts = Router();
/* 
realTimeProducts.get("/", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const products = await manager.getProducts(limit);
  res.render("realTimeProducts", { productos: products });
}); */
router.get("/realtimeproducts", async (req, res) => {
  const allProducts = await manager.getProducts();
  res.render("realtimeproducts", { title: "Productos", products: allProducts });
});
export default realTimeProducts;
