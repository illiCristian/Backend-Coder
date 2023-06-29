import { Router } from "express";
import userModel from "../Dao/models/user.js";
import passport from "passport";
import UserController from "../controllers/user.controller.js";
const router = Router();
export const users = userModel.find().lean();
const userController = new UserController();

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  userController.register
);
router.post("/failregister", userController.failregister);

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  userController.login
);

router.get("/faillogin", userController.faillogin);

router.get("/current", userController.current);

router.get("/logout", userController.logout);

router.post("/resetpassword", userController.resetPassword);

router.get("/github", passport.authenticate("github"), async (req, res) => {});

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  userController.githubCallback
);
export default router;
