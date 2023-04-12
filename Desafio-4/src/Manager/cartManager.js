import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import ProductManager from "./productManager.js";
const path = "../src/files/carts.json";

const productManager = new ProductManager();

export default class CartsManager {
  constructor() {
    this.carts = [];
    this.path = path;
  }

  getCarts = async (limit) => {
    if (fs.existsSync(this.path)) {
      console.log("existe el archivo");
      const data = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      if (limit && typeof limit === "number" && limit > 0) {
        return products.slice(0, limit);
      }
      return products;
    } else {
      console.log('no existe el archivo "products.json"');
      return [];
    }
  };

  writeCarts = async (carts) => {
    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
  };

  addCarts = async (product) => {
    const carts = await this.getCarts();
    let id = uuidv4();
    let newCarts = [{ id: id, products: [] }, ...carts];
    await this.writeCarts(newCarts);
    return "Carrito agregado con exito";
  };

  getCartById = async (id) => {
    const carts = await this.getCarts();
    const cart = carts.find((cart) => cart.id === id);
    if (cart) return cart;
    return undefined;
  };

  addProductInCart = async (cartId, productId) => {
    const carts = await this.getCarts();

    const cart = await this.getCartById(cartId);
    if (!cart) return "Carrito no encontrado";
    const product = await productManager.getProductById(productId);
    if (!product) return "Producto no encontrado";
    if (product.status === false) return "Producto no disponible";

    let cartFilter = carts.filter((cart) => cart.id !== cartId);

    if (cart.products.some((prod) => prod.id === productId)) {
      const newProductInCart = cart.products.find(
        (prod) => prod.id === productId
      );
      newProductInCart.cantidad++;
      let newCart = [cart, ...cartFilter];
      await this.writeCarts(newCart);
      return "Producto sumado al carrito";
    }

    cart.products.push({ id: productId, cantidad: 1 });

    let newCart = [cart, ...cartFilter];

    await this.writeCarts(newCart);
    return "Producto agregado al carrito";
  };
}
