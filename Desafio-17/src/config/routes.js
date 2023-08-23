//import productRouter from "../Dao/routes/products.router.js";
//import realTimeProducts from "../Dao/routes/realTimeProducts.js";

import cartRouterDb from "../routes/cartsDb.routes.js";
import productsDb from "../routes/productsDb.routes.js";
import viewRouter from "../routes/views.routes.js";
import cartRouter from "../routes/cart.router.js";
import mockingProducts from "../routes/mocking.routes.js";
import loggerRoute from "../routes/logger.routes.js";
import userRouter from "../routes/user.routes.js";
import { swaggerSpec } from "../config/swaggerConfig.js";
import swaggerUi from "swagger-ui-express";
import sessionRouter from "../routes/sessions.routes.js";
import imageRouter from "../routes/images.routes.js";
function configureRoutes(app) {
  //app.use("/realTimeProducts", realTimeProducts);
  // app.use("/api/products", productRouter);

  app.use("/api/cartsDb", cartRouterDb);
  app.use("/api/productsDatabase", productsDb);
  app.use("/", viewRouter);
  app.use("/api/carts", cartRouter);
  app.use("/mockingproducts", mockingProducts);
  app.use("/loggertest", loggerRoute);
  app.use("/api/users", userRouter);
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/api/images", imageRouter);
  app.use("/api/session", sessionRouter);
}
export default configureRoutes;
