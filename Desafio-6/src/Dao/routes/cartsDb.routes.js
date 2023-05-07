import { Router } from "express";
import CartsManagerDB from "../Manager/cartManajerDB.js";
import cartModel from "../models/cart.js";

const router = Router();

const cartManagerDb = new CartsManagerDB();

router.get("/", async (req, res) => {
  try {
    const resPonse = await cartManagerDb.getCartsDB();
    res.status(200).json(resPonse);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, error: "error en el get del servidor" });
  }
})
//Crear un carrito
router.post("/", async (req, res) => {
  const cart = req.body;
  try {
    const resPonse = await cartManagerDb.createCartDB(cart);
    res.status(200).json(resPonse);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, error: "error en el post del servidor" });
  }

})
//Agregar un producto al carrito
router.post("/:cid/product/:pid", async (req, res) => {
  let id = req.params.cid;
  let products = parseInt(req.params.pid);
  const cart = { id, products };
  try {
    const resPonse = await cartManagerDb.createCartDB(cart);
    res.status(200).json(resPonse);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, error: "error en el post del servidor" });
  }
});

export default router;
