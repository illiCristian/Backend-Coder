import CartMongo from "../Dao/Manager/cart.mongo.js";
import { v4 as uuidv4 } from "uuid";
import TicketMongo from "../Dao/Manager/ticket.mongo.js";
import ProductsMongo from "../Dao/Manager/products.mongo.js";
import transporter from "../config/gmailConfig.js";
const cartMongo = new CartMongo();
const ticketMongo = new TicketMongo();
const productMongo = new ProductsMongo();
export default class CartController {
  //obtener un carrito y mostrar sus productos
  //Esta funcion deberia llamarse getCartSession pero cuando cambio el nombre da error
  getCart = async (req, res) => {
    console.log(req.session.user + " session");
    const cartId = req.session?.user?.cart;
    console.log(cartId + " carritoID");
    try {
      const cart = await cartMongo.getCartById(cartId);
      console.log(cart);
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
      const resPonse = await cartMongo.createCartAddProduct(pid, user);
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
    const productId = req.params.pid;
    try {
      const response = await cartMongo.deleteProductsInCart(cartId, productId);
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
  purchase = async (req, res) => {
    //const cartId = req.session?.user?.cart;
    const cartId = req.params.cid;
    const cart = await cartMongo.getCartById(cartId);
    if (!cart)
      return res.status(404).send({ message: "Carrito no encontrado" });
    const userEmail = req.session?.user?.email;
    const ticketProducts = [];
    const rejectedProducts = [];
    const { products } = cart;
    let totalAmount = 0;
    products.forEach((el) => {
      if (el.quantity <= el.product.stock) {
        ticketProducts.push({ _id: el.product._id, quantity: el.quantity });
        totalAmount += el.product.price * el.quantity;
        cartMongo.deleteProductsInCart(cartId, el.product._id);
        productMongo.updateStock(
          el.product._id,
          el.product.stock - el.quantity
        );
      } else {
        rejectedProducts.push(el.product._id);
      }
    });
    const newTicket = {
      code: uuidv4(),
      amount: totalAmount,
      purcharser: userEmail,
      products: ticketProducts,
    };
    const ticket = await ticketMongo.createTicket(newTicket);
    if (ticket) {
      try {
        const contenido = await transporter.sendMail({
          from: "CodersHouse",
          to: userEmail,
          subject: "Compra realizada",
          html: `
          <h1>Compra realizada con exito!</h1> 
          <strong>Monto total</strong>: ${totalAmount}`,
        });
      } catch (error) {
        console.log(error);
      }
    }

    res.status(200).json(cart);
  };
}
