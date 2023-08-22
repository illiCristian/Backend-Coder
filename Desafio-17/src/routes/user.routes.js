import { Router } from "express";
import { adminAcces, privateAcces } from "../middlewares/userMiddleware.js";
import UserController from "../controllers/user.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { contactSchema } from "../schemas/auth.schema.js";
import { uploaderDocument } from "../middlewares/multerFiles.js";

const router = Router();
const userController = new UserController();

router.get("/premium/:uid", (req, res) => {
  res.send("Hello");
});
//
router.post("/contact", validateSchema(contactSchema), userController.contact);
//http://localhost:8080/api/users/64e3cded6bc58576c4ba0a89/documents
router.put(
  "/:uid/documents",
  uploaderDocument.fields([
    { name: "identificacion", maxCount: 1 },
    { name: "domicilio", maxCount: 1 },
    { name: "estadoDeCuenta", maxCount: 1 },
  ]),
  UserController.updateUserDocument
);

router.put("/premium/:uid", adminAcces, userController.changeRol);

export default router;

/*   */
