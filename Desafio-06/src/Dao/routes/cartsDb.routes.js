import { Router } from "express";
import CartsManagerDB from "../Manager/cartManajerDB.js";
import cartModel from "../models/cart.js";

const router = Router();

const cartManagerDb = new CartsManagerDB();
//Obtener carrito
router.get("/", async (req, res) => {
  try {
    const resPonse = await cartManagerDb.getCartsDB();
    res.status(200).json(resPonse);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, error: "error en el get del servidor" });
  }
});
//Obtener carrito por id
router.get("/:cid", async (req, res) => {
  const id = req.params.cid;
  try {
    const cart = await cartManagerDb.getCartByIdDb(id);
    if (!cart) return res.status(404).send({ error: "Carrito no encontrado" });
    res.send(cart);
  } catch (error) {
    res.status(500).send({ error: "Error al consultar el carrito" });
  }
});
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
});
//Agregar un producto al carrito
//http://localhost:8080/api/cartsDb/64569e3b76205486b61f1375/product/64554742aa6dcf46b903dd30 test funcionando
router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  try {
    const response = await cartManagerDb.addProductInCartDb(cartId, productId);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Error en el servidor" });
  }
});
/* router.post("/:cid/product/:pid", async (req, res) => {
  let id = req.params.cid;
  let products = parseInt(req.params.pid);
  const cart = { id, products };
  try {
    const resPonse = await cartManagerDb.addProductInCart(cart);
    res.status(200).json(resPonse);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, error: "error en el post del servidor" });
  }
}); */

export default router;
