import { Router } from "express";
import ProductManager from "../Manager/productManager.js";
import productModel from "../models/products.js";
import cartModel from "../models/cart.js";
/* import ProductManagerDb from "../Manager/productManagerDb.js"; */
const router = Router();
const manager = new ProductManager();

router.get("/", async (req, res) => {
  const { page = 1, limit, category, sort } = req.query;
  const options = { page, limit: parseInt(limit) || 20, lean: true };
  if (sort) {
    options.sort = { [sort]: 1 };
  } else {
    options.sort = { title: 1 };
  }
  const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } =
    await productModel.paginate(
      { category: category || { $exists: true } },
      options
    );
  const products = docs;

  res.render("home", {
    products,
    hasPrevPage,
    hasNextPage,
    nextPage,
    prevPage,
    limit,
    totalPages,
  });
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
/*  */
router.get("/products", async (req, res) => {
  const { page = 1, limit, category, sort, status } = req.query;
  const options = { page, limit: parseInt(limit) || 20, lean: true };
  if (sort) {
    options.sort = { [sort]: 1 };
  } else {
    options.sort = { title: 1 };
  }
  const filter = { category: category || { $exists: true } };
  if (status !== undefined) {
    filter.status = status === "true";
  }
  const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } =
    await productModel.paginate(filter, options);
  const products = docs;

  res.render("products", {
    products,
    hasPrevPage,
    hasNextPage,
    nextPage,
    prevPage,
    limit,
    totalPages,
  });
});

router.get("/cart/:uid", async (req, res) => {
  const { uid } = req.params;
  try {
    const cart = await cartModel
      .findById(uid)
      .populate("products.product")
      .lean();
    res.render("cart", { title: "Carrito", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

/*   const products = await productsManagerDb.getAllProducts();
  const prods = products.map((item) => item.toObject()); */
