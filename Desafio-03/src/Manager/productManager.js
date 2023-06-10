import fs from "fs";

const path = "./src/files/products.json";

export default class ProductManager {
  constructor() {
    this.products = [];
    this.lastId = 0;
    this.path = path;
  }

  addProduct = async (product) => {
    const products = await this.getProducts();
    const { title, description, price, thumbnail, code, stock } = product;

    if (products.some((product) => product.code === code)) {
      console.log("Error: Producto con el mismo codigo ya existe!!");
      return "Error: Producto con el mismo codigo ya existe!!";
    }
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return "Error: Todos los campos son requeridos";
    }

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
      const data = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      if (limit && typeof limit === "number" && limit > 0) {
        return products.slice(0, limit);
      }
      return products;
    } else {
      return [];
    }
  };

  getProductById = async (id) => {
    const products = await this.getProducts();

    const product = products.find((el) => el.id === id);
    if (!product) {
      console.log("Error: Producto no encontrado");
      return { Error: "Producto no encontrado" };
    }
    return product;
  };
  updateProduct = async (
    id,
    title,
    description,
    price,
    thumbnail,
    code,
    stock
  ) => {
    /* Traigo los productos usando un metodo el metodo getProducts */
    const products = await this.getProducts();
    const product = await this.getProductById(id);
    const index = products.findIndex((p) => p.id === id);

    if (!product) {
      return "Error: Producto no encontrado";
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
    const products = await this.getProducts();
    const product = await this.getProductById(id);
    if (!product) {
      return console.log("Error: Producto no encontrado");
    } else {
      const index = products.indexOf(product);
      products.splice(index, 1);
      try {
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, "\t")
        );
        return "Producto eliminado con exito";
      } catch (error) {
        return error;
      }
    }
  };
}
