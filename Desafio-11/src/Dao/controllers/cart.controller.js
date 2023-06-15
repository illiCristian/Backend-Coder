import cartModel from "../models/cart.js";

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
      res.render("cart", { title: "Carrito", cart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
