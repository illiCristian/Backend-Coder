import viewRouter from "../Dao/routes/views.routes.js";
import productRouter from "../Dao/routes/products.router.js";
import cartRouter from "../Dao/routes/cart.router.js";
import realTimeProducts from "../Dao/routes/realTimeProducts.js";
import productsDb from "../Dao/routes/productsDb.routes.js";
import cartRouterDb from "../Dao/routes/cartsDb.routes.js";

function configureRoutes(app) {
  app.use("/realTimeProducts", realTimeProducts);
  app.use("/api/productsDatabase", productsDb);
  app.use("/api/cartsDb", cartRouterDb);
  app.use("/", viewRouter);
  app.use("/api/products", productRouter);
  app.use("/api/carts", cartRouter);
}
export default configureRoutes;
