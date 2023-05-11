import productModel from "../models/products.js";

export default class ProductManagerDb {
  //Obtener todos los productos de la base de datos
  async getAllProducts() {
    try {
      const products = await productModel.find();
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }
}
