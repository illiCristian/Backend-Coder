import { Router } from "express";
import ProductController from "../controllers/products.controller.js";
import ChatController from "../controllers/chat.controller.js";
import CartController from "../controllers/cart.controller.js";
import {
  publicAcces,
  privateAcces,
  adminAcces,
} from "../../middlewares/userMiddleware.js";
import UserController from "../controllers/user.controller.js";

const router = Router();

/* Controllers */
const productController = new ProductController();
const chatController = new ChatController();
const cartController = new CartController();
const userController = new UserController();

/* Products Db */
router.get("/", productController.getAllProducts);
router.get("/productsDb", productController.productsDb);
router.get("/realtimeproducts", productController.realTimeProducts);
router.get("/products", productController.productsFilter);

/* Chat */
router.get("/chat", chatController.renderChat);

/* Cart */
router.get("/cart", cartController.getCart);

/* User */
router.get("/register", publicAcces, userController.register);
router.get("/login", publicAcces, userController.login);
router.get("/profile", privateAcces, userController.profile);
router.get("/resetpassword", publicAcces, userController.resetPassword);
router.get("/admin", privateAcces, adminAcces, userController.admin);
export default router;
