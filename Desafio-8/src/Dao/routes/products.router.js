import { Router } from "express";
import ProductManager from "../Manager/productManager.js";
const router = Router();

const manager = new ProductManager();

/*
getProducts con limite y sin limite
metodo: get
test: http://localhost:8080/api/products/?limit=3 */
router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit);
  if (limit) {
    try {
      const products = await manager.getProducts(limit);
      res.send(products);
    } catch (err) {
      res.status(500).send("Something went wrong");
    }
  } else {
    try {
      const products = await manager.getProducts();
      res.send(products);
    } catch (err) {
      res.status(500).send("Something went wrong");
    }
  }
});
/*
getProducts por id
metodo: get
test: http://localhost:8080/api/products/3 */
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send("Id must be a number");
    return;
  }
  try {
    const product = await manager.getProductById(id);
    res.send(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
/* 
Agregar un nuevo producto
metodo: post
test: http://localhost:8080/api/products/ 
body: {
      "title" : "Producto nuevo agregado",
      "description" : "Remera lisa",
      "price" : 290,
      "thumbnail" : "direccion de la imagen",
      "code" : "5113212",
      "stock" : 31,
      "category" : "remeras"
} */
router.post("/", async (req, res) => {
  const newProduct = req.body;
  try {
    const product = await manager.addProduct(newProduct);
    res.send({
      status: "Success",
      product,
    });
  } catch (e) {
    res.status(400).send({
      status: "Error",
      message: e.message,
    });
  }
});
/* 
Editar un producto
metodo: put
test: http://localhost:8080/api/products/3
body: {
      "title" : "Producto nuevo agregado",
      "description" : "Remera estampada",
      "price" : 334,
      "thumbnail" : "direccion de la imagen",
      "code" : "15113212",
      "stock" : 31,
      "category" : "remeras"
}
 */
router.put("/:id", async (req, res) => {
  try {
    const editProduct = req.body;
    const id = parseInt(req.params.id);
    const product = await manager.updateProduct(id, editProduct);
    if (product) {
      res.send({
        status: "Success",
        product,
      });
    } else {
      res.status(400).send({
        status: "Error",
        message: "Product does not exist",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: "Internal Server Error",
    });
  }
});
/* 
Borrar un producto
metodo: delete
test: http://localhost:8080/api/products/3
*/
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let product = await manager.deleteProduct(id);
    res.send(product);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;
