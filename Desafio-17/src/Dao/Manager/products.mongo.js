import productModel from "../models/products.js";

class ProductsMongo {
  constructor() {
    this.productModel = productModel;
  }
  getAllProducts = async (category, options) => {
    try {
      const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } =
        await productModel.paginate(
          { category: category || { $exists: true } },
          options
        );
      return { docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages };
    } catch (error) {
      console.log(error);
    }
  };
  getProductById = async (id) => {
    try {
      const result = await productModel.findById(id);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  async createProduct(product) {
    try {
      const result = await productModel.create(product);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateProduct(id, product) {
    try {
      const result = await productModel.findByIdAndUpdate(id, product);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async updateStock(id, newStock) {
    try {
      const productDb = await productModel.findById(id);
      productDb.stock = newStock;
      const res = await productDb.save();
      if (!res) return null;
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProductId(id) {
    console.log("llego aca");
    try {
      const result = await productModel.findByIdAndDelete(id);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async stockHandler(product) {
    try {
      const result = await productModel.findByIdAndUpdate(product._id, product);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProductsMongo;
