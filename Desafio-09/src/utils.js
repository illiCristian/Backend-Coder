import { fileURLToPath } from "url";
import { dirname } from "path";
import Jwt from "jsonwebtoken";

const PRIVATE_KEY = "my-secret-key";
export const generateToken = user => {
  const token = Jwt.sign({
    user
  }, PRIVATE_KEY, { expiresIn: "1d" })
  return token
}
export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "error" });
  console.log(authHeader);
  const token = authHeader.split(" ")[1];
  Jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "No autorizado" });
    req.user = decoded;
    next();
  });
}
//Encriptar contraseñas con bycrpt
import bcrypt from "bcrypt";
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const validatePassword = (password, user) =>
  bcrypt.compareSync(password, user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;

import fs from "fs";

export function readJSON(filename) {
  const data = fs.readFileSync(filename, "utf8");
  return JSON.parse(data);
}
