import { Router } from "express";
import ProductManager from "../Manager/productManager.js";
import productModel from "../models/products.js";
import ProductManagerDb from "../Manager/productManagerDb.js";
const router = Router();

const manager = new ProductManager();

const productsManagerDb = new ProductManagerDb();

router.get("/", async (req, res) => {
  const allProducts = await manager.getProducts();
  res.render("home", { title: "Productos", products: allProducts });
});
router.get("/realtimeproducts", async (req, res) => {
  const allProducts = await manager.getProducts();
  res.render("realtimeproducts", { title: "Productos", products: allProducts });
});
router.get("/productsDb", async (req, res) => {
  try {
    const result = await productModel.find();
    res.render("productsDb", {
      title: "Productos",
      products: result,
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/chat", (req, res) => {
  res.render("chat", { title: "Chat" });
});
router.get("/products", async (req, res) => {
  const products = await productsManagerDb.getAllProducts();
  const prods = products.map((item) => item.toObject());
  res.render("products", { title: "Productos", products: prods });
});

export default router;
