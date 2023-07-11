import { generateToken } from "../middlewares/validateToken.js";
import userModel from "../Dao/models/user.js";
import { createHash } from "../utils.js";
import { GetUserDto } from "../Dao/Dto/user.dto.js";
export default class UserController {
  registerView = async (req, res) => {
    res.render("register");
  };
  loginView = async (req, res) => {
    res.render("login");
  };
  profileView = async (req, res) => {
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
  register = async (req, res) => {
    try {
      res.status(200).json({
        status: "success",
        payload: req.user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al procesar la solicitud",
      });
    }
  };
  failregister = (req, res) => {
    console.log("Fallo al registrarse ");
    res.send({ error: " Error en el rgistro" });
  };
  login = async (req, res) => {
    if (!req.user)
      return res
        .status(400)
        .send({ status: "error", error: "Invalid credentials" });
    console.log(req.user);
    req.session.user = {
      name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      role: req.user.role,
      id: req.user._id,
      cart: req.user.cart,
    };
    console.log(req.session.user + " en session routes");
    const token = await generateToken({
      id: req.user._id,
    });
    res.cookie("token", token);
    console.log(token);
    res.send({
      status: "success",
      payload: req.user,
      message: "Primer logueo!!",
      token: token,
    });
  };
  logout = (req, res) => {
    req.session.destroy((err) => {
      if (err)
        return res
          .status(500)
          .send({ status: "error", error: "No pudo cerrar sesion" });
      res.redirect("/login");
    });
  };
  faillogin = (req, res) => {
    console.log("Fallo en el ingreso");
    res.send({ error: "Error en el ingreso" });
  };
  current = (req, res) => {
    let { first_name, last_name, email, age, cart } = req.session.user;
    console.log(req.session.user.name);
    const user = new GetUserDto({ first_name, last_name, email, age, cart });
    res.send({ status: "success", payload: user });
  };
  resetpassword = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .send({ status: "error", error: "Datos incorrectos" });

    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(400)
        .send({ status: "error", error: "Datos incorrectos" });

    const newHashedPassword = createHash(password);

    await userModel.updateOne(
      { _id: user._id },
      { $set: { password: newHashedPassword } }
    );

    res.send({ status: "success", message: "Contraseña actualizada" });
  };
  githubCallback = async (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  };
}
