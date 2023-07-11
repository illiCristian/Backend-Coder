import express from "express";
import __dirname from "./utils.js";
import configureServer from "./config/server.js";
import "./config/database.js";
import configureMiddlewares from "./config/middlewares.js";
import configureRoutes from "./config/routes.js";
import configureHandlebars from "./config/handlebars.js";
import sessionRouter from "./routes/sessions.routes.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";
const app = express();

configureMiddlewares(app);
configureServer(app);
configureHandlebars(app);
app.use(express.json()); //tiene que estar antes de las rutas
configureRoutes(app);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.set("views", __dirname + "/views");
app.use("/api/session", sessionRouter);
app.use(errorHandler);
/* Funcion creada para subir datos a la bd
import products from "./Dao/files/arrayProductos.js";
import productModel from "./Dao/models/products.js";

async function main() {
  try {
    await productModel.insertMany(products);
  } catch (error) {
    console.log(error);
  }
} */
// main();
