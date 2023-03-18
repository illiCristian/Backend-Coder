class ProductManager {
  constructor() {
    this.products = [];
    this.lastId = 0;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Error: All fields are required");
      return;
    }
    if (this.products.some((product) => product.code === code)) {
      console.log("Error: Product with the same code already exists");
      return;
    }
    const newProduct = {
      id: ++this.lastId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(newProduct);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    !product ? console.log("Error: Product not found") : console.log(product);
  }
}


/* 
const productos = new ProductManager();
console.log(productos.getProducts());

productos.addProduct("nombre", "descripcion", 100, "imagen", "abc123", 3);
productos.addProduct("nombre2", "descripcio2", 1002, "imagen2", "abc122", 3);
productos.addProduct("nombre2", "descripcio2", 1002, "abc122", 3);

console.log(productos.getProducts());

productos.getProductById(3);
 */