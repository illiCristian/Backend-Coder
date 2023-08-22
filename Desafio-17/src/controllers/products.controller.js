import ProductManager from "../Dao/Manager/productManager.js";
import ProductsMongo from "../Dao/Manager/products.mongo.js";
import productModel from "../Dao/models/products.js";
import { generateProduct } from "../utils.js";
import { CustomError } from "../services/customError.service.js";
import { generateProductErrorInfo } from "../services/ErrorInfo.js";
import { EError } from "../enums/Errors.js";
const manager = new ProductManager();
const productMongo = new ProductsMongo();
export default class ProductController {
  //Obtener todos los productos de la db
  getAllProducts = async (req, res) => {
    const { page = 1, limit, category, sort } = req.query;
    const options = { page, limit: parseInt(limit) || 10, lean: true };
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
      req.logger.error(error);
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
    console.log(req.body);
    try {
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
        CustomError.createError({
          name: "Error",
          cause: "Faltan datos para crear el producto",
          message: generateProductErrorInfo(
            title,
            description,
            price,
            stock,
            thumbnail,
            code,
            category,
            status
          ),
          errorCode: EError.INVALID_JSON,
        });
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
        owner: req.session.user.id,
      };

      const result = await productMongo.createProduct(product);
      res.status(200).json({ status: "succes", payload: result });
    } catch (error) {
      res.status(400).send({ message: error.message });
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
    try {
      const productId = req.params.id;
      const product = await productModel.findById(productId);
      if (product) {
        const productOwer = JSON.parse(JSON.stringify(product.owner));
        console.log(productOwer);
        const userId = req.user.id;
        console.log(userId);
        if (
          (req.user.role === "premium" && productOwer == userId) ||
          req.user.role === "admin"
        ) {
          await productModel.findByIdAndDelete(productId);
          return res.json({ status: "success", message: "producto eliminado" });
        } else {
          res.json({
            status: "error",
            message: "no puedes borrar este producto",
          });
        }
      } else {
        return res.json({ status: "error", message: "El producto no existe" });
      }
    } catch (error) {
      res.send(error.message);
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
      req.logger.error(error);
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
    if (req.session?.user?.role === "admin") {
      res.render("productsAdmin", {
        products,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage,
        limit,
        totalPages,
        user: req.session.user,
      });
    } else {
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
    }
  };

  getProducts = async (req, res) => {
    try {
      const result = await productModel.find();
      if (!result) return res.status(404).send({ message: "No hay productos" });
      res.send({ status: "success", payload: result });
    } catch (error) {
      req.logger.error(error);
    }
  };
  mockingProducts = async (req, res) => {
    let products = [];
    for (let i = 0; i < 100; i++) {
      let product = generateProduct();
      products.push(product);
    }
    res.status(200).json(products);
  };
}
