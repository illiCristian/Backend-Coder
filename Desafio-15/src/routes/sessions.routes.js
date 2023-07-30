import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/user.controller.js";
import { privateAcces } from "../middlewares/userMiddleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { loginSchema } from "../schemas/auth.schema.js";
const router = Router();
const userController = new UserController();

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  userController.register
);
router.post("/failregister", userController.failregister);

router.post(
  "/login",
  validateSchema(loginSchema),
  passport.authenticate("login", {
    failureRedirect: "/faillogin",
  }),
  userController.login
);

router.get("/faillogin", userController.faillogin);

router.get("/current", privateAcces, userController.current);

router.get("/logout", userController.logout);

router.post("/resetpassword", userController.resetPassword);

router.post("/forgotpassword", userController.forgotPassword);

router.get("/github", passport.authenticate("github"), async (req, res) => {});

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  userController.githubCallback
);
export default router;
