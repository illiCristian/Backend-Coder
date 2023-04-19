import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import viewRouter from "./routes/views.routes.js";
import { readJSON } from "./utils.js";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";

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

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} http://localhost:${PORT}`);
});

//Socket
const socketServerIo = new Server(server);
socketServerIo.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("message", (data) => {
    socketServerIo.emit("log", data);
  });
});
app.use("/", viewRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
