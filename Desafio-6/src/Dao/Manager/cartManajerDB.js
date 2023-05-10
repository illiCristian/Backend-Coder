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
      const prodIndex = cart.products.findIndex((cprod) => cprod._id === cid);

      if (prodIndex === -1) {
        const product = {
          _id: pid,
          quantity: 1,
        };
        cart.products.push(product);
      } else {
        let total = cart.products[prodIndex].quantity;
        cart.products[prodIndex].quantity = total + 1;
      }

      const result = await cartModel.updateOne({ _id: cid }, { $set: cart });

      return result;
    } catch (error) {
      console.log(error + "error en el create cart ");
    }
  };
}
