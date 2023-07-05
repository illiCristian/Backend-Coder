import CartMongo from "../Dao/Manager/cart.mongo.js";

const cartMongo = new CartMongo();
export default class CartController {
  //obtener un carrito y mostrar sus productos
  //Esta funcion deberia llamarse getCartSession pero cuando cambio el nombre da error
  getCart = async (req, res) => {
    console.log(req.session.user + " session");
    const cartId = req.session?.user?.cart;
    console.log(cartId + " carritoID");
    try {
      const cart = await cartMongo.getCartById(cartId);
      if (cart) {
        res.render("cart", { title: "Carrito", cart });
      } else {
        res.send("No hay productos en el carrito");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  getCarts = async (req, res) => {
    try {
      const resPonse = await cartMongo.getCarts();
      res.status(200).json(resPonse);
    } catch (error) {
      res.status(500).json({
        error: error.message,
        errorType: "error en el get del servidor",
      });
    }
  };
  getCartId = async (req, res) => {
    const id = req.params.cid;
    try {
      const cart = await cartMongo.getCartById(id);
      if (!cart)
        return res.status(404).send({ error: "Carrito no encontrado" });
      res.send(cart);
    } catch (error) {
      res.status(500).send({ error: "Error al consultar el carrito" });
    }
  };
  createCart = async (req, res) => {
    const cart = req.body;
    try {
      const resPonse = await cartMongo.createCart(cart);
      res.status(200).json(resPonse);
    } catch (error) {
      res.status(500).json({
        error: error.message,
        errorType: "error en el post del servidor",
      });
    }
  };
  createCartAddProduct = async (req, res) => {
    const { pid } = req.params;
    const user = req.session?.user;
    try {
      const resPonse = cartMongo.createCartAddProduct(pid, user);
      res.status(200).json(resPonse);
    } catch (error) {
      res.status(500).json({
        error: error.message,
        errorType: "error en el post del servidor",
      });
    }
  };
  addProductInCart = async (req, res) => {
    const cartId = req.session?.user?.cart;
    console.log(cartId);
    const productId = req.params.pid;
    try {
      const response = await cartMongo.addProductInCartDB(cartId, productId);
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
  };
  deleteProductInCart = async (req, res) => {
    const cartId = req.params.cid;
    try {
      const response = await cartMongo.deleteProductsInCart(cartId);
      res.status(200).json(response);
    } catch (error) {
      res
        .status(500)
        .json({ error: error.message, errorType: "Error en el servidor" });
    }
  };
  updateProductInCart = async (req, res) => {
    const { pid, cid } = req.params;
    const { quantity } = req.body;
    console.log(pid, cid, quantity);
    try {
      const response = await cartMongo.updateProductInCart(cid, pid, quantity);
      if (response === null)
        return res.status(404).send({ error: "Producto no encontrado" });
      res.status(200).json(response);
    } catch (error) {
      res
        .status(500)
        .json({ error: error.message, errorType: "Error en el servidor" });
    }
  };
  updateCart = async (req, res) => {
    const { cid } = req.params;
    const products = req.body;
    console.log(products);
    try {
      const response = await cartMongo.updateCart(cid, products);
      if (response === null)
        return res.status(404).send({ error: "Carrito no encontrado" });
      res.status(200).json(response);
    } catch (error) {
      res
        .status(500)
        .json({ error: error.message, errorType: "Error en el servidor" });
    }
  };
}
