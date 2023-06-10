import session from "express-session";
import MongoStore from "connect-mongo";

const db = "users";
const MONGO =
  "mongodb+srv://svrk73:qeS9S9bZ4oHZQuIb@cluster0.6jukxnz.mongodb.net/" + db;

function configureMiddlewares(app) {
  app.use(
    session({
      store: new MongoStore({
        mongoUrl: MONGO,
        ttl: 3600,
      }),
      secret: "CoderSecret",
      resave: false,
      saveUninitialized: false,
    })
  );
}
export default configureMiddlewares;
