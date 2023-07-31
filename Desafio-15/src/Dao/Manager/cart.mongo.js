import cartModel from "../models/cart.js";
import productModel from "../models/products.js";
import userModel from "../models/user.js";
class CartMongo {
  constructor() {
    this.cartModel = cartModel;
  }
  async getCartById(cartId) {
    console.log(cartId + "null?=");
    try {
      const result = await this.cartModel
        .findById(cartId)
        .populate("products.product")
        .lean();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async getCarts() {
    try {
      const result = await this.cartModel.find();
      if (result) return result;
    } catch (error) {
      console.log(error + "error en el get carts ");
    }
  }
  async createCart() {
    try {
      this.cartModel.create();
      return cartModel;
    } catch (error) {
      console.log(error + "error en el create cart");
    }
  }
  createCartAddProduct = async function (pid, user) {
    const { id } = user;
    try {
      const productExist = await productModel.findById(pid);
      if (!productExist) return null;

      const user = await userModel.findById(id);

      console.log(user + "usercart");
      if (!user) return null;
      if (!user.cart) {
        const newCart = await cartModel.create({
          products: [{ product: pid, quantity: 1 }],
        });
        const result = await newCart.save();
        user.cart = newCart._id; // Asignar el ObjectId del nuevo carrito
      } else {
        // Si el usuario ya tiene un carrito, agregar el nuevo producto al carrito existente
        const existingCart = await cartModel.findById(user.cart);
        existingCart.products.push({ product: pid, quantity: 1 });
        await existingCart.save();
      }

      const result = await user.save();

      return result;
    } catch (error) {
      console.log(error);
    }
  };
  addProductInCartDB = async function (cid, pid) {
    try {
      const productExist = await productModel.findById(pid);
      if (!productExist) {
        return null;
      }

      if (productExist.stock === 0) {
        return null;
      }
      const cart = await this.cartModel.findOne({ _id: cid });
      const productIndex = cart.products.findIndex((p) => p.product == pid);
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ product: pid, quantity: 1 });
      }
      const result = await cart.save();
      return result;
    } catch (error) {
      console.log(error + "error en el add product in cartDB ");
    }
  };
  deleteProductsInCart = async function (cid, pid) {
    try {
      const result = await this.cartModel.updateOne(
        { _id: cid },
        { $pull: { products: { product: pid } } }
      );
      return result;
    } catch (error) {
      console.log(error + "error en el delete product in cartDB ");
    }
  };
  updateProductInCart = async (cid, pid, quantity) => {
    const productExist = await productModel.findById(pid);
    if (!productExist) return null;
    try {
      const cart = await this.cartModel.findById(cid);
      const product = cart.products.find((p) => p.product.equals(pid));
      if (product) {
        product.quantity = quantity;
        await cart.save();
        return cart;
      }
      return null;
    } catch (error) {
      console.log(error + "error en el update product in cartDB ");
      return null;
    }
  };
  updateCart = async (cid, cart) => {
    const cartExist = await this.cartModel.findById(cid);
    if (!cartExist) return null;
    if (!Array.isArray(cart)) {
      throw new Error("El carrito debe ser un arreglo de productos");
    }
    for (const product of cart) {
      const existingProduct = cartExist.products.find(
        (p) => p.product.toString() === product.product
      );

      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        cartExist.products.push(product);
      }
    }
    const updatedCart = await cartExist.save();
    return updatedCart;
  };
}
export default CartMongo;
