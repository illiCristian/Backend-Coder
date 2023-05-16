import { Router } from "express";
import productModel from "../models/products.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await productModel.find();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await productModel.findById(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, price, stock, thumbnail, code, category } =
      req.body;
    console.log(title, description, price, stock, thumbnail, code, category);
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
    };

    const result = await productModel.create(product);
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
    const result = await productModel.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al eliminar" });
  }
});
export default router;
