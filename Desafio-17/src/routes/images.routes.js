import { Router } from "express";
import upload from "../middlewares/multer.js";

import UserController from "../controllers/user.controller.js";

import { adminAcces } from "../middlewares/userMiddleware.js";

const router = Router();

const userController = new UserController();

router.get("/", (req, res) => {
  res.send("Hello");
});
//adminAcces,
router.post(
  "/uploadimage",
  upload.array("images"),
  userController.uploadPicture
);

export default router;
