import { Router } from "express";
import ProductManager from "../Manager/productManager.js";
import productModel from "../models/products.js";
import { parse } from "uuid";
/* import ProductManagerDb from "../Manager/productManagerDb.js"; */
const router = Router();

const manager = new ProductManager();

/* const productsManagerDb = new ProductManagerDb(); */

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
  const { page = 1, limit } = req.query;

  const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } =
    await productModel.paginate(
      {},
      { page, limit: parseInt(limit) || 6, lean: true }
    );
  const products = docs;

  res.render("products", {
    products,
    hasPrevPage,
    hasNextPage,
    nextPage,
    prevPage,
    limit,
  });
});

export default router;

/*   const products = await productsManagerDb.getAllProducts();
  const prods = products.map((item) => item.toObject()); */
