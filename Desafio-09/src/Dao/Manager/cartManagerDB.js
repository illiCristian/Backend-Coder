import cartModel from "../models/cart.js";
import productModel from "../models/products.js";
export default class CartsManagerDB {
  getCartsDB = async function () {
    try {
      const result = await cartModel.find();
      return result;
    } catch (error) {
      console.log(error + "error en el get carts ");
    }
  };
  getCartByIdDb = async function (id) {
    try {
      const result = await cartModel.findById(id).populate("products.product");
      return result;
    } catch (error) {
      console.log(error + "error en el get cart by id ");
    }
  };

  createCartDB = async function () {
    try {
      cartModel.create();
      return cartModel;
    } catch (error) {
      console.log(error + "error en el create cart");
    }
  };
  /* createCartAddProductDB = async function (pid) {
    const productExist = await productModel.findById(pid);
    if (!productExist) return null;
    try {
      const newCart = await cartModel.create({ products: [] });
      console.log(newCart + " new cart mdf");
      newCart.products.push({ product: pid, quantity: 1 });
      const result = await newCart.save();
      return result;
    } catch (error) {
      console.log(error);
    }
  }; */
  createCartAddProductDB = async function (pid) {
    const productExist = await productModel.findById(pid);
    if (!productExist) return null;

    try {
      const newCart = await cartModel.create({
        products: [{ product: pid, quantity: 1 }],
      });
      console.log(newCart + " new cart mdf");

      const result = await newCart.save();
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
      const cart = await cartModel.findOne({ _id: cid });
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
  deleteProductInCart = async function (cid, pid) {
    try {
      const result = await cartModel.updateOne(
        { _id: cid },
        { $pull: { products: { product: pid } } }
      );
      return result;
    } catch (error) {
      console.log(error + "error en el delete product in cartDB ");
    }
  };
  deleteProductsInCart = async function (cartID) {
    try {
      const result = await cartModel.updateOne(
        { _id: cartID },
        { $set: { products: [] } }
      );
      return result;
    } catch (error) {
      console.log(error + "error en el delete products in cartDB ");
    }
  };

  updateProductInCart = async function (cid, pid, quantity) {
    const productExist = await productModel.findById(pid);
    if (!productExist) return null;
    try {
      const cart = await cartModel.findById(cid);
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
  updateCart = async function (cid, cart) {
    const cartExist = await cartModel.findById(cid);
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
