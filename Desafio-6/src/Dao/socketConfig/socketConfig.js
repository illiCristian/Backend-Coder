import ProductManager from "../Manager/productManager.js";
import http from "http";
import { Server } from "socket.io";
import ChatManagerDb from "../Manager/chatManagerDb.js";
const manager = new ProductManager();
const chatManager = new ChatManagerDb();
const messages = [];
const configureServerSocket = (app) => {
  const server = http.createServer(app);
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("Conectado al cliente");

    socket.on("newproduct", async (producto) => {
      const res = await manager.addProduct(producto);
      console.log(res);
      io.emit("printData", await manager.getProducts());
    });
    socket.on("devolvemeLosProductos", async () => {
      io.emit("printData", await manager.getProducts());
    });
    socket.on("deleteProduct", async ({ id }) => {
      const res = await manager.deleteProduct(id);
      console.log(res);
      io.emit("printData", await manager.getProducts());
    });
    /* socketServerIO.emit("actualizarTabla", await manager.getProducts()); */
    //Listener del cliente
    socket.on("message", (data) => {
      messages.push(data);
      io.emit("messageLogs", messages);
      chatManager.saveChat(data); 
      console.log(data);
    });
    socket.on("authenticatedev", (data) => {
      socket.broadcast.emit("newUserConnected", data);
    });
    socket.on("disconnect", () => {
      console.log("Cliente Desconectado");
    });
  });

  return { server, io };
};

export default configureServerSocket;
