import { Router } from "express";
import userModel from "../models/User.model.js";
import { createHash, validatePassword } from "../../utils.js";
const router = Router();

//http://localhost:8080/api/session/register
/* body: {
  "first_name": "Nuevo Admin",
   "last_name": "Hola soy admind",
   "email": "adminCoder@coder.com",
   "password": "adminCod3r123",
   "role": "admin",
   "age": 25
} */
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password, role } = req.body;
  const exist = await userModel.findOne({ email });
  if (exist) {
    return res
      .status(400)
      .send({ status: "error", error: "User already exists" });
  }
  const user = {
    first_name,
    last_name,
    email,
    age,
    password: createHash(password),
    role: role,
  };

  const result = await userModel.create(user);
  res.send({
    status: "succes",
    result: result,
    message: "User registered",
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res
        .status(400)
        .send({ status: "error", error: "Datos incorrectos" });
    }
    const isValid = validatePassword(password, user);
    if (!isValid)
      return res
        .status(401)
        .send({ status: "error", error: "Datos incorrectos" });

    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      role: user.role,
    };
    res.send({
      status: "success",
      payload: req.session.user,
      message: "Primer logueo!!",
    });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
    console.log(error);
  }
});

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
  if (!email || !password)
    return res.status(400).send({
      status: "error",
      error: "Datos incorrectos al intentar resetear el password",
    });
  const user = await userModel.findOne({ email });
  if (!user)
    return res.status(401).send({
      status: "error",
      error: "Datos incorrectos al intentar resetear el password",
    });
  const newHashedPassword = createHash(password);

  await userModel.updateOne(
    { _id: user._id },
    { $set: { password: newHashedPassword } }
  );
  res.status(200).send({ status: "success", message: "Password changed" });
});

export default router;
