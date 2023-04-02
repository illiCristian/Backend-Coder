import ProductManager from "./product/productManager.js";

const manager = new ProductManager();

const env = async () => {
  let product = {
    title: "nombre",
    description: "primer producto",
    price: 100,
    thumbnail: "imagen",
    code: "abc123457",
    stock: 3,
  };

  try {
    let result = await manager.addProduct(product);
    console.log(result);
  } catch (error) {
    console.log(error);
  }

  let products = await manager.getProducts();
  if (products) {
    console.log(products);
  } else {
    console.log("An error occurred");
  }
  console.log("This statement will always run");

  try {
    await manager.updateProduct(1, {
      title: "Producto actualizado",
      description: "Producto nuevo actualizado",
      price: 300,
      stock: 10,
    });
  } catch (error) {
    console.log("Error al actualizar el producto");
  }

  //console.log(products);

  // await manager.deleteProduct(2);
  /* console.log(await manager.getProductById()); */
};

env();
