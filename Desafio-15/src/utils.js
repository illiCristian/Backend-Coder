import { fileURLToPath } from "url";
import { dirname } from "path";
import jwt from "jsonwebtoken";
import config from "./config/config.js";
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
import { Faker, en } from "@faker-js/faker";

export function readJSON(filename) {
  const data = fs.readFileSync(filename, "utf8");
  return JSON.parse(data);
}

export const customFaker = new Faker({
  //Por Ej. el idioma
  locale: [en],
});

const { commerce, image, database, string } = customFaker;

export const generateProduct = () => {
  return {
    _id: database.mongodbObjectId(),
    title: commerce.productName(),
    description: commerce.productDescription(),
    category: commerce.department(),
    price: parseFloat(commerce.price()),
    departament: commerce.department(),
    stock: parseInt(string.numeric(2)),
    image: image.url(),
    code: string.alphanumeric(10),
  };
};

export const isValidPassword = (password, user) => {
  return bcrypt.compareSync(password, user.password);
};

export const generateEmailToken = (email, expireTime) => {
  console.info(config.gmail.emailToken + "asd");
  const token = jwt.sign({ email }, config.gmail.emailToken, {
    expiresIn: expireTime,
  });
  return token;
};

export const verifyEmailToken = (token) => {
  try {
    const info = jwt.verify(token, config.gmail.emailToken);
    return info.email;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
