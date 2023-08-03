import { Router } from "express";
import { adminAcces } from "../middlewares/userMiddleware.js";
import UserController from "../controllers/user.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { contactSchema } from "../schemas/auth.schema.js";

const router = Router();
const userController = new UserController();

router.get("/premium/:uid", (req, res) => {
  res.send("Hello");
});
//
router.post("/contact", validateSchema(contactSchema), userController.contact);
router.put("/premium/:uid", adminAcces, userController.changeRol);

export default router;
