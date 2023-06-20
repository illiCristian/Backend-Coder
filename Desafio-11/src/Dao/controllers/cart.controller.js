import CartsManagerDB from "../Manager/cartManagerDB.js";
import cartModel from "../models/cart.js";
const cartManagerDb = new CartsManagerDB();
export default class CartController {
  //obtener un carrito y mostrar sus productos
  getCart = async (req, res) => {
    console.log(req.session.user + " session");
    const cartId = req.session?.user?.cart;
    console.log(cartId + " carritoID");
    try {
      const cart = await cartModel
        .findById(cartId)
        .populate("products.product")
        .lean();
      if (cart) {
        res.render("cart", { title: "Carrito", cart });
      } else {
        res.send("No hay productos en el carrito");
      }
      //res.render("cart", { title: "Carrito", cart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  getCarts = async (req, res) => {
    async (req, res) => {
      try {
        const resPonse = await cartManagerDb.getCartsDB();
        res.status(200).json(resPonse);
      } catch (error) {
        res.status(500).json({
          error: error.message,
          errorType: "error en el get del servidor",
        });
      }
    };
  };
  getCartId = async (req, res) => {
    const id = req.params.cid;
    try {
      const cart = await cartManagerDb.getCartByIdDb(id);
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
      const resPonse = await cartManagerDb.createCartDB(cart);
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
    const user = req.session.user;
    try {
      const resPonse = await cartManagerDb.createCartAddProductDB(pid, user);
      res.status(200).json(resPonse);
    } catch (error) {
      res.status(500).json({
        error: error.message,
        errorType: "error en el post del servidor",
      });
    }
  };
  addProductInCart = async (req, res) => {
    const cartId = req.session.user.cart;
    console.log(cartId);
    const productId = req.params.pid;
    try {
      const response = await cartManagerDb.addProductInCartDB(
        cartId,
        productId
      );
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
      const response = await cartManagerDb.deleteProductsInCart(cartId);
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
  };
  updateCart = async (req, res) => {
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
  };
}
