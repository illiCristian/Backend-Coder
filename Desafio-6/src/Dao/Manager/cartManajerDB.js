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

  createCartDB = async function (product) {
    try {
      cartModel.create(product);
      return cartModel;
    } catch (error) {
      console.log(error + "error en el create cart");
    }
    /*  const { _id } = cartsDb;
    console.log(_id); */
    /* try { 
      cartModel.create(cart);
      return cartModel;
    } catch (error) {
      console.log(error + "error en el create cart ");
    }*/
  };
  addProductInCart = async function (cart) {
    try {
      const existingCart = await cartModel.findOne({ id: cart.id });
      if (existingCart) {
        existingCart.products.push({
          productId: cart.productId,
          quantity: cart.quantity,
        });
        await existingCart.save();
        return existingCart;
      } else {
        const newCart = await cartModel.create({
          id: cart.id,
          products: [
            {
              productId: cart.productId,
              quantity: cart.quantity,
            },
          ],
        });
        return newCart;
      }
    } catch (error) {
      console.log(error + "error en el create cart ");
    }
  };
}
