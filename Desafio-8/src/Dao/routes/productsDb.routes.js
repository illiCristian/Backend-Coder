import { Router } from "express";
import productModel from "../models/products.js";
import ProductManagerDb from "../Manager/productManagerDb.js";
const router = Router();
const productManager = new ProductManagerDb();
/* test: http://localhost:8080/api/productsDatabase/
result: {
  "docs": [
    {...}
  ],
  "totalDocs": 50,
  "limit": 20,
  "totalPages": 3,
  "page": 1,
  "pagingCounter": 1,
  "hasPrevPage": false,
  "hasNextPage": true,
  "prevPage": null,
  "nextPage": 2
}*/
router.get("/", async (req, res) => {
  const { page = 1, limit, category, sort } = req.query;
  const options = { page, limit: parseInt(limit) || 20, lean: true };
  if (sort) {
    options.sort = { [sort]: 1 };
  } else {
    options.sort = { title: 1 };
  }
  try {
    const result = await productManager.getAllProducts(category, options);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await productManager.getProductById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      stock,
      thumbnail,
      code,
      category,
      status,
    } = req.body;
    if (
      !title ||
      !description ||
      !price ||
      !stock ||
      !thumbnail ||
      !code ||
      !category
    ) {
      return res.status(400).send({ message: "Faltan datos" });
    }
    const product = {
      title,
      description,
      stock,
      price,
      thumbnail,
      code,
      category,
      status,
    };

    const result = await productManager.createProduct(product);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
//http://localhost:8080/api/productsDatabase/6462956ccdb11f7f26a847e0
//req.body
//result status: false
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      stock,
      thumbnail,
      code,
      category,
      status,
    } = req.body;
    console.log(req.body);
    const result = await productModel.findByIdAndUpdate(id, {
      title,
      description,
      stock,
      price,
      thumbnail,
      code,
      category,
      status,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const res = await productManager.deleteProductId(id);
    res.status(200).json(res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al eliminar" });
  }
});
export default router;
