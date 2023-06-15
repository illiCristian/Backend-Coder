import userModel from "../models/User.model.js";

export default class UserController {
  register = async (req, res) => {
    res.render("register");
  };
  login = async (req, res) => {
    res.render("login");
  };
  profile = async (req, res) => {
    res.render("profile", {
      user: req.session.user,
    });
  };
  resetPassword = async (req, res) => {
    res.render("resetpassword");
  };
  admin = async (req, res) => {
    try {
      const users = await userModel.find().lean().exec();
      console.log(users);
      res.render("admin", {
        user: req.session.user,
        users,
      });
    } catch (error) {
      // Manejo de errores
      console.error(error);
      res.status(500).send("Error al obtener los usuarios");
    }
  };
}
