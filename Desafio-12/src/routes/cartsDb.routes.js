import { Router } from "express";
import CartController from "../controllers/cart.controller.js";

const router = Router();
//Controllers
//const productController = new ProductController();

const cartController = new CartController();
//Mostrar todos los carritos de la db
router.get("/", cartController.getCarts);
//Obtener carrito por id
//http://localhost:8080/api/cartsDb/645ed1e42e52f2654412797d
//resultado: muestra el carrito y el producto completo que esta dentro del carrito
router.get("/:cid", cartController.getCartId);
//Crear un  carrito y
router.post("/", cartController.createCart);
//Crear un  carrito y agregar un producto validado que el producto existe en la bd
router.post("/:pid", cartController.addProductInCart);

//Agregar un producto al carrito
//http://localhost:8080/api/cartsDb/64569e3b76205486b61f1375/product/64554737aa6dcf46b903dd2e test funcionando
router.post("/:cid/product/:pid");
//Borrar un producto del carrito
//http://localhost:8080/api/cartsDb/64569e3b76205486b61f1375/product/64554737aa6dcf46b903dd2e test funcionando
router.delete("/:cid/product/:pid", cartController.addProductInCart);
//Borrar todos los productos de un carrito
//test http://localhost:8080/api/cartsDb/645ed1db2e52f26544127978
//resultado: muestra el carrito sin el producto que se borro en el delete
router.delete("/:cid", cartController.deleteProductInCart);
//test http://localhost:8080/api/cartsDb/645ed1e42e52f2654412797d/product/645d306ed43cdb657147638d {quantity: 121}
//result  "quantity": 121,
router.put("/:cid/product/:pid", cartController.updateProductInCart);
//Actualizar actualizar el carrito con un arreglo de productos con el formato especificado arriba.
//Test http://localhost:8080/api/cartsDb/645ed1e42e52f2654412797d
/* Body: [{
                "product": "6462956ccdb11f7f26a847e2",
                "quantity": 24
               
            },{
                "product": "6462956ccdb11f7f26a847e1",
                "quantity": 20
            },{
                "product": "6462956ccdb11f7f26a847e4",
                "quantity": 10
            },{
                "product": "6462956ccdb11f7f26a847e5",
                "quantity": 100
            },{
                "product": "6462956ccdb11f7f26a847e6",
                "quantity": 120
            }
]*/
//resultado: muestra el carrito con los productos actualizados

router.put("/:cid", cartController.updateCart);
export default router;
