import { fileURLToPath } from "url";
import { dirname } from "path";

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
