import { Router } from "express";
import { adminAcces } from "../middlewares/userMiddleware.js";
import UserController from "../controllers/user.controller.js";

const router = Router();
const userController = new UserController();

router.get("/premium/:uid", (req, res) => {
  res.send("Hello");
});
//
router.put("/premium/:uid", adminAcces, userController.changeRol);

export default router;
