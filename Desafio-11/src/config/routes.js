//import productRouter from "../Dao/routes/products.router.js";
//import realTimeProducts from "../Dao/routes/realTimeProducts.js";

import cartRouterDb from "../Dao/routes/cartsDb.routes.js";
import productsDb from "../Dao/routes/productsDb.routes.js";
import viewRouter from "../Dao/routes/views.routes.js";
import cartRouter from "../Dao/routes/cart.router.js";

function configureRoutes(app) {
  //app.use("/realTimeProducts", realTimeProducts);
  // app.use("/api/products", productRouter);

  app.use("/api/cartsDb", cartRouterDb);
  app.use("/api/productsDatabase", productsDb);
  app.use("/", viewRouter);
  app.use("/api/carts", cartRouter);
}
export default configureRoutes;
