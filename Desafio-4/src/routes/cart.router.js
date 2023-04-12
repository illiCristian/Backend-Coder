import { Router } from "express";
import CartsManager from "../Manager/cartManager.js";

const router = Router();
const manager = new CartsManager();

/* 
Obtener carrito por id
metodo: get
test: http://localhost:8080/api/carts/6eb5902a-1d49-41d8-9109-4b0005e845af 
result: muestra el carrito existente*/
router.get("/:cid", async (req, res) => {
  const id = req.params.cid;
  try {
    const cart = await manager.getCartById(id);
    if (!cart) return res.status(404).send({ error: "Carrito no encontrado" });
    res.send(cart);
  } catch (error) {
    res.status(500).send({ error: "Error al consultar el carrito" });
  }
});

/* 
Agregar producto al carrito
metodo: post
test : http://localhost:8080/api/carts/6eb5902a-1d49-41d8-9109-4b0005e845af/product/7
result: agrega un producto al carrito y si este ya existe suma uno a la cantidad
*/
router.post("/:cid/product/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = parseInt(req.params.pid);
  try {
    const cart = await manager.addProductInCart(cartId, productId);
    res.send({
      status: "Success",
      cart,
    });
  } catch (error) {
    res.status(500).send({ error: "Error al consultar el producto" });
  }
});

export default router;

/*

  router.post("/", async (req, res) => {
  const newCart = req.body;
  const cart = manager.addCarts(newCart);
  res.send({
    status: "Success",
    cart,
  });
}); */
