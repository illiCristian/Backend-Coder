import express from "express";
import handlebars from "express-handlebars";

import __dirname from "./utils.js";
import viewRouter from "./routes/views.routes.js";
import { readJSON } from "./utils.js";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import realTimeProducts from "./routes/realTimeProducts.js";
import configureServerSocket from "./socketConfig/socketConfig.js";

const app = express();
const hbs = handlebars.create({
  helpers: {
    readJSON: readJSON,
  },
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", hbs.engine);
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const PORT = process.env.PORT || 8080;

//Socket
/* const socket = configureServerSocket(server); */
const { server } = configureServerSocket(app);
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} http://localhost:${PORT}`);
});

app.use("/realTimeProducts", realTimeProducts);
app.use("/", viewRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
