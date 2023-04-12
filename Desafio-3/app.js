import ProductManager from "./src/Manager/productManager.js";
import express from "express";

const manager = new ProductManager();

const app = express();

app.use(express.urlencoded({ extended: true }));

const PORT = 8082;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", async (req, res) => {
  const products = await manager.getProducts();
  res.send(products);
});

app.get("/products", async (req, res) => {
  const limit = parseInt(req.query.limit);
  if (limit) {
    const products = await manager.getProducts(limit);
    res.send(products);
  } else {
    const products = await manager.getProducts();
    res.send(products);
  }
});

app.get("/products/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const product = await manager.getProductById(id);
  res.send(product);
});

app.get("/eliminar/:id", async (req, res) => {
  const { id } = req.params;
  const product = await manager.deleteProduct(id);
  res.send(product);
});

app.get("/newquery", async (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.query;
  const product = {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
  };
  const newProduct = await manager.addProduct(product);
  res.send(newProduct);
  /* http://localhost:8080/newquery/?title=camisa&description=camisa%20de%20algodon&price=100&thumbnail=imagen.jpg&code=123&stock=10 */
});

app.get("/editquery", async (req, res) => {
  const { id, title, description, price, thumbnail, code, stock } = req.query;
  if (
    !title ||
    !description ||
    !price ||
    !thumbnail ||
    !id ||
    !stock ||
    !code
  ) {
    res.send("Faltan datos");
    return;
  }
  const newProduct = await manager.updateProduct(
    parseInt(id),
    title,
    description,
    parseFloat(price),
    thumbnail,
    code,
    parseInt(stock)
  );
  res.send(newProduct);
  /* http://localhost:8080/editquery/?id=2&title=camisa&description=camisa%20de%20algodon&price=100&thumbnail=imagen.jpg&code=123&stock=10 */
});
