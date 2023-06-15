import ProductManager from "../Manager/productManager.js";
import productModel from "../models/products.js";
const manager = new ProductManager();

export default class ProductController {
  //Obtener todos los productos de la db
  getAllProducts = async (req, res) => {
    const { page = 1, limit, category, sort } = req.query;
    const options = { page, limit: parseInt(limit) || 20, lean: true };
    if (sort) {
      options.sort = { [sort]: 1 };
    } else {
      options.sort = { title: 1 };
    }
    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } =
      await productModel.paginate(
        { category: category || { $exists: true } },
        options
      );
    const products = docs;
    res.render("home", {
      products,
      hasPrevPage,
      hasNextPage,
      nextPage,
      prevPage,
      limit,
      totalPages,
      user: req.session.user,
    });
  };
  //Obtener todos los productos de del file
  realTimeProducts = async (req, res) => {
    const allProducts = await manager.getProducts();
    res.render("realtimeproducts", {
      title: "Productos",
      products: allProducts,
    });
  };

  productsDb = async (req, res) => {
    try {
      const result = await productModel.find();
      res.render("productsDb", {
        title: "Productos",
        products: result,
      });
    } catch (error) {
      console.log(error);
    }
  };
  productsFilter = async (req, res) => {
    const { page = 1, limit, category, sort, status } = req.query;
    const options = { page, limit: parseInt(limit) || 20, lean: true };

    if (sort) {
      options.sort = { [sort]: 1 };
    } else {
      options.sort = { title: 1 };
    }
    const filter = { category: category || { $exists: true } };
    if (status !== undefined) {
      filter.status = status === "true";
    }
    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } =
      await productModel.paginate(filter, options);
    const products = docs;

    res.render("products", {
      products,
      hasPrevPage,
      hasNextPage,
      nextPage,
      prevPage,
      limit,
      totalPages,
      user: req.session.user,
    });
  };
}
