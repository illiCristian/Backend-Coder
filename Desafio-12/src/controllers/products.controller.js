import ProductManager from "../Dao/Manager/productManager.js";
import ProductsMongo from "../Dao/Manager/products.mongo.js";
import productModel from "../Dao/models/products.js";
const manager = new ProductManager();
const productMongo = new ProductsMongo();
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
    try {
      const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } =
        await productMongo.getAllProducts(category, options);
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
    } catch (error) {
      console.log(error);
    }
  };
  //Obtener un productopor id
  getProductById = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await productMongo.getProductById(id);
      if (!result) res.status(404).send({ message: "Producto no encontrado" });
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  //Crear un producto
  createProduct = async (req, res) => {
    try {
      console.log(req.body);
      const {
        title,
        description,
        price,
        stock,
        thumbnail,
        code,
        category,
        status,
      } = req.body;
      if (
        !title ||
        !description ||
        !price ||
        !stock ||
        !thumbnail ||
        !code ||
        !category
      ) {
        return res.status(400).send({ message: "Faltan datos" });
      }
      const product = {
        title,
        description,
        stock,
        price,
        thumbnail,
        code,
        category,
        status,
      };

      const result = await productMongo.createProduct(product);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  //Actualizar un producto
  updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        price,
        stock,
        thumbnail,
        code,
        category,
        status,
      } = req.body;
      const update = {
        title: title ? title : undefined,
        description: description ? description : undefined,
        price: price ? price : undefined,
        stock: stock ? stock : undefined,
        thumbnail: thumbnail ? thumbnail : undefined,
        code: code ? code : undefined,
        category: category ? category : undefined,
        status: status ? status : undefined,
      };
      const result = await productMongo.updateProduct(id, update);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  //Eliminar un producto
  deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
      const res = await productMongo.deleteProductId(id);
      res.status(200).json(res);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al eliminar" });
    }
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
      if (!result) return res.status(404).send({ message: "No hay productos" });
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
  getProducts = async (req, res) => {
    try {
      const result = await productModel.find();
      if (!result) return res.status(404).send({ message: "No hay productos" });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  };
}
