import { Router } from "express";
import userModel from "../models/User.model.js";
import { authToken, createHash, generateToken } from "../../utils.js";
import passport from "passport";
const router = Router();
export const users = userModel.find().lean();


router.post("/register", passport.authenticate("register", { failureRedirect: "/failregister" }), async (req, res) => {
  res.send({ status: "succes", message: "User registered" });
})
router.post("/failregister", async (req, res) => {
  console.log("Fallo al registrarse ");
  res.send({ error: " Error en el rgistro" })
})

/* router.post("/login", passport.authenticate("login", { failureRedirect: "/faillogin" }), async (req, res) => {

  if (!req.user) return res.status(400).send({ status: "error", error: "Invalid credentials" });
  console.log(req.user);
  req.session.user = {
    name: req.user.first_name,
    last_name: req.user.last_name,
    age: req.user.age,
    email: req.user.email,
    role: req.user.role
  }

  const accessToken = generateToken(req.user);
  res.send({ status: "success", payload: req.user, message: "Primer logueo!!", token: accessToken });
}) */
router.post("/login", (req, res, next) => {
  passport.authenticate("login", (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error de autenticación" });
    }
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    req.login(user, { session: false }, (error) => {
      if (error) {
        return res.status(500).json({ message: "Error de autenticación" });
      }

      const accessToken = generateToken(user);
      return res.json({ token: accessToken });
    });
  })(req, res, next);
});

router.get("/faillogin", async (req, res) => {

  console.log("Fallo en el ingreso");
  res.send({ error: "Error en el ingreso" })
})
router.get("/current", authToken, (req, res) => {
  res.send({ status: "success", payload: req.user });
})

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err)
      return res
        .status(500)
        .send({ status: "error", error: "No pudo cerrar sesion" });
    res.redirect("/login");
  });
});

router.post("/resetpassword", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).send({ status: "error", error: "Datos incorrectos" })

  const user = await userModel.findOne({ email });
  if (!user) return res.status(400).send({ status: "error", error: "Datos incorrectos" })

  const newHashedPassword = createHash(password);

  await userModel.updateOne({ _id: user._id }, { $set: { password: newHashedPassword } });

  res.send({ status: "success", message: "Contraseña actualizada" })
})


router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => { })

router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {

  req.session.user = req.user;
  res.redirect("/")

})
export default router;
