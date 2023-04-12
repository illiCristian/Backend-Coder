import express from "express";

import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} http://localhost:${PORT}`);
});
app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
