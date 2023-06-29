//import productRouter from "../Dao/routes/products.router.js";
//import realTimeProducts from "../Dao/routes/realTimeProducts.js";

import cartRouterDb from "../routes/cartsDb.routes.js";
import productsDb from "../routes/productsDb.routes.js";
import viewRouter from "../routes/views.routes.js";
import cartRouter from "../routes/cart.router.js";

function configureRoutes(app) {
  //app.use("/realTimeProducts", realTimeProducts);
  // app.use("/api/products", productRouter);

  app.use("/api/cartsDb", cartRouterDb);
  app.use("/api/productsDatabase", productsDb);
  app.use("/", viewRouter);
  app.use("/api/carts", cartRouter);
}
export default configureRoutes;
