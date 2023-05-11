import cartModel from "../models/cart.js";

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
      const result = await cartModel.findById(id);
      return result;
    } catch (error) {
      console.log(error + "error en el get cart by id ");
    }
  };
  addProductInCartDb = async function (cart) {
    try {
      const result = await cartModel.findById(cart.id);
      if (result) {
        result.products.push({
          productId: cart.productId,
          quantity: cart.quantity,
        });
        await result.save();
        return result;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error + "error en el add product in cart ");
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
  addProductInCart = async function (cid, pid) {
    try {
      const cart = await cartModel.find({ _id: cid });
      cart[0].products.push({ product: pid });
      //updateOne recibe el filtro y despues el valor
      const result = await cartModel.updateOne({ _id: cid }, { $set: cart[0] });
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
      const result = await cartModel.updateOne({ _id: cartID }, { $set: { products: [] } });
      return result;
    } catch (error) {
      console.log(error + "error en el delete products in cartDB ");
    }
  };
  
}
