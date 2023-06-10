import { Router } from "express";
import CartsManagerDB from "../Manager/cartManagerDB.js";

const router = Router();

const cartManagerDb = new CartsManagerDB();
//Obtener carrito
router.get("/", async (req, res) => {
  try {
    const resPonse = await cartManagerDb.getCartsDB();
    res.status(200).json(resPonse);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      errorType: "error en el get del servidor",
    });
  }
});
//Obtener carrito por id
//http://localhost:8080/api/cartsDb/645ed1e42e52f2654412797d
//resultado: muestra el carrito y el producto completo que esta dentro del carrito
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
//Crear un  carrito
router.post("/", async (req, res) => {
  const cart = req.body;

  try {
    const resPonse = await cartManagerDb.createCartDB(cart);
    res.status(200).json(resPonse);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      errorType: "error en el post del servidor",
    });
  }
});
//Crear un  carrito y agregar un producto validado que el producto existe en la bd
router.post("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const resPonse = await cartManagerDb.createCartAddProductDB(pid);
    res.status(200).json(resPonse);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      errorType: "error en el post del servidor",
    });
  }
});

//Agregar un producto al carrito
//http://localhost:8080/api/cartsDb/64569e3b76205486b61f1375/product/64554737aa6dcf46b903dd2e test funcionando
router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  try {
    const response = await cartManagerDb.addProductInCartDB(cartId, productId);
    if (!response)
      return res
        .status(404)
        .send({ error: "No se pudo agregar, producto inexistente" });
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Error en el servidor" });
  }
});
//Borrar un producto del carrito
//http://localhost:8080/api/cartsDb/64569e3b76205486b61f1375/product/64554737aa6dcf46b903dd2e test funcionando
router.delete("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  try {
    const response = await cartManagerDb.deleteProductInCart(cartId, productId);
    if (response === null)
      return res.status(404).send({ error: "Producto no encontrado" });
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Error en el servidor" });
  }
});
//Borrar todos los productos de un carrito
//test http://localhost:8080/api/cartsDb/645ed1db2e52f26544127978
//resultado: muestra el carrito sin el producto que se borro en el delete
router.delete("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  try {
    const response = await cartManagerDb.deleteProductsInCart(cartId);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, errorType: "Error en el servidor" });
  }
});
//test http://localhost:8080/api/cartsDb/645ed1e42e52f2654412797d/product/645d306ed43cdb657147638d {quantity: 121}
//result  "quantity": 121,
router.put("/:cid/product/:pid", async (req, res) => {
  const { pid, cid } = req.params;
  const { quantity } = req.body;
  console.log(pid, cid, quantity);
  try {
    const response = await cartManagerDb.updateProductInCart(
      cid,
      pid,
      quantity
    );
    if (response === null)
      return res.status(404).send({ error: "Producto no encontrado" });
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, errorType: "Error en el servidor" });
  }
});
//Actualizar actualizar el carrito con un arreglo de productos con el formato especificado arriba.
//Test http://localhost:8080/api/cartsDb/645ed1e42e52f2654412797d
/* Body: [{
                "product": "6462956ccdb11f7f26a847e2",
                "quantity": 24
               
            },{
                "product": "6462956ccdb11f7f26a847e1",
                "quantity": 20
            },{
                "product": "6462956ccdb11f7f26a847e4",
                "quantity": 10
            },{
                "product": "6462956ccdb11f7f26a847e5",
                "quantity": 100
            },{
                "product": "6462956ccdb11f7f26a847e6",
                "quantity": 120
            }
]*/
//resultado: muestra el carrito con los productos actualizados
router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const products = req.body;
  console.log(products);
  try {
    const response = await cartManagerDb.updateCart(cid, products);
    if (response === null)
      return res.status(404).send({ error: "Carrito no encontrado" });
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, errorType: "Error en el servidor" });
  }
});
export default router;
