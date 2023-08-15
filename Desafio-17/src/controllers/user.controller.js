import { generateToken } from "../middlewares/validateToken.js";
import userModel from "../Dao/models/user.js";
import {
  createHash,
  generateEmailToken,
  isValidPassword,
  validatePassword,
  verifyEmailToken,
} from "../utils.js";
import { GetUserDto } from "../Dao/Dto/user.dto.js";
import { sendContactEmail, sendRecoveryPass } from "../config/gmailConfig.js";
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
  forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      console.log(email);
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "El usuario no existe" });
      }
      const token = generateEmailToken(email, 60 * 60);
      console.log(token);
      const result = await sendRecoveryPass(email, token);
      console.log(result);
      res.send({ status: "success", message: "Correo enviado" });
    } catch (error) {
      console.log(error);
    }
  };

  resetPassword = async (req, res) => {
    try {
      const token = req.query.token;
      const { email, newPassword } = req.body;
      console.log(email, newPassword);
      const validEmail = verifyEmailToken(token);
      if (!validEmail) {
        return res.send("Link no valido, reintente de nuevo");
      }
      const user = await userModel.findOne({ email: validEmail });
      if (!user) {
        throw new Error("El usuario no existe");
      }
      if (isValidPassword(newPassword, user)) {
        return res.send("No puedes usar la misma contraseña.");
      }
      const userData = {
        ...user._doc,
        password: createHash(newPassword),
      };
      const userUpdate = await userModel.findOneAndUpdate(
        { email: email },
        userData
      );
      req.logger.info("Usuario actualizado", userUpdate);
      res.render("login", { message: "contraseña actualizada" });
    } catch (error) {
      console.log(error);
    }
  };
  resetPasswordView = async (req, res) => {
    const token = req.query.token;
    res.render("resetpassword", { token });
  };
  admin = async (req, res) => {
    try {
      const users = await userModel.find().lean().exec();
      req.logger.warn("Usuario admin logueado");
      res.render("admin", {
        user: req.session.user,
        users,
      });
    } catch (error) {
      // Manejo de errores
      req.logger.error(error);
      res.status(500).send("Error al obtener los usuarios");
    }
  };
  register = async (req, res) => {
    try {
      res.status(200).json({
        status: "success",
        payload: req.user,
      });
      req.logger.info("Usuario registrado");
    } catch (error) {
      const errorMessage =
        req.authInfo.message || "Hubo un error en el registro";
      res.status(400).json({ error: errorMessage });
    }
  };
  failregister = (req, res) => {
    req.logger.warn("Fallo al registrarse");
    res.send({ error: " Error en el rgistro" });
  };
  login = async (req, res) => {
    if (!req.user)
      return res
        .status(400)
        .send({ status: "error", error: "Invalid credentials" });
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      role: req.user.role,
      id: req.user._id,
      cart: req.user.cart,
    };
    req.logger.info("Usuario logueado");
    const token = await generateToken({
      id: req.user._id,
    });
    res.cookie("token", token);
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
      req.logger.info("Usuario desconectado");
    });
  };
  faillogin = (req, res) => {
    req.logger.warn("Fallo en el ingreso");
    /*  res.send({ error: "Error en el ingreso" }); */
    res.render("faillogin");
  };
  current = (req, res) => {
    let { first_name, last_name, email, age, cart } = req.session.user;
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
    req.logger.info("Usuario logueado usando github");
    res.redirect("/");
  };
  googleCallback = async (req, res) => {
    req.session.user = req.user;
    req.logger.info("Usuario logueado usando google");
    res.redirect("/");
  };

  changeRol = async (req, res) => {
    try {
      const userId = req.params.uid;
      //verificar si el usuario existe en la base de datos
      const user = await userModel.findById(userId);
      !user &&
        res.json({
          status: "error",
          message: "El usuario no existe",
        });
      const userRole = user.role;
      if (userRole === "user") {
        user.role = "premium";
      } else if (userRole === "premium") {
        user.role = "user";
      } else {
        return res.json({
          status: "error",
          message: "no es posible cambiar el role del usuario",
        });
      }
      await userModel.updateOne({ _id: user._id }, user);
      res.send({ status: "success", message: "rol modificado" });
    } catch (error) {
      console.log(error.message);
      res.json({
        status: "error",
        message: "hubo un error al cambiar el rol del usuario",
      });
    }
  };
  contact = async (req, res) => {
    const { name, email, message } = req.body;
    //aca enviaria una copia de la consulta al mail de la empresa
    try {
      const result = await sendContactEmail(email);
      if (result) {
        res.send({ status: "success" });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
}
