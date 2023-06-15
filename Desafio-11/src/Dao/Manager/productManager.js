import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const filePath = path.join(__dirname, "../files/products.json");

export default class ProductManager {
  constructor() {
    this.products = [];
    this.lastId = 0;
    this.path = filePath;
  }

  addProduct = async (product) => {
    const products = await this.getProducts();
    const { title, description, price, thumbnail, code, stock, category } =
      product;

    if (products.some((product) => product.code === code)) {
      console.log("Error: Producto con el mismo codigo ya existe!!");
      return "Error: Producto con el mismo codigo ya existe!!";
    }
    if (
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !code ||
      !stock ||
      !category
    ) {
      return "Error: Todos los campos son requeridos";
    }
    product.status = true;
    if (products.length === 0) {
      product.id = 1;
    } else {
      product.id = products[products.length - 1].id + 1;
    }
    products.push(product);
    /*  */
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );
    return product;
  };

  getProducts = async (limit) => {
    if (fs.existsSync(this.path)) {
      console.log("existe el archivo");
      const data = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      if (limit && typeof limit === "number" && limit > 0) {
        return products.slice(0, limit);
      }
      return products;
    } else {
      console.log("no existe el archivo products.json");
      return [];
    }
  };

  getProductById = async (id) => {
    const products = await this.getProducts();
    const product = products.find((el) => el.id === id);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  };
  updateProduct = async (id, editProduct) => {
    /* Traigo los productos usando un metodo el metodo getProducts */
    const {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    } = editProduct;
    console.log(editProduct.status);
    const products = await this.getProducts();
    const product = await this.getProductById(id);
    const index = products.findIndex((p) => p.id === id);

    if (!product) {
      return (mensaje = "Error: Producto no encontrado");
    } else {
      title && typeof title === "string" && title.trim() !== ""
        ? (product.title = title)
        : console.log(
            "El título no es una cadena de caracteres válida o esta vacio"
          );
      description &&
      typeof description === "string" &&
      description.trim() !== ""
        ? (product.description = description)
        : console.log(
            "La descripción no es una cadena de caracteres válida o esta vacia"
          );
      price && typeof price === "number" && price > 0
        ? (product.price = price)
        : console.log("El precio no es un número válido o es menor a 0");
      stock && typeof stock === "number" && stock > 0
        ? (product.stock = stock)
        : console.log("El stock no es un número válido o es menor a 0");
      code && typeof code === "string" && code.trim() !== ""
        ? (product.code = code)
        : console.log(
            "El código no es una cadena de caracteres válida o esta vacia"
          );
      thumbnail && typeof thumbnail === "string" && thumbnail.trim() !== ""
        ? (product.thumbnail = thumbnail)
        : console.log(
            "La imagen no es una cadena de caracteres válida o esta vacia"
          );
      if (status) {
        product.status = status;
      } else {
        console.log("El status no es un booleano");
      }

      category && typeof category === "string" && category.trim() !== ""
        ? (product.category = category)
        : console.log(
            "La categoria no es una cadena de caracteres válida o esta vacia"
          );
      if (index !== -1) {
        products[index] = product;
      }
      console.log(product);
      try {
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, "\t")
        );
        return {
          mensaje: "Producto actualizado con exito ",
          producto: product,
        };
      } catch (error) {
        return error;
      }
    }
  };
  deleteProduct = async (id) => {
    let products = await this.getProducts();
    const productIndex = products.findIndex((product) => product.id == id);
    console.log(productIndex);
    if (productIndex === -1) {
      return "Error: Producto no encontrado";
    }
    products.splice(productIndex, 1);
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
      return "Producto eliminado con exito";
    } catch (error) {
      return error;
    }
  };
}
