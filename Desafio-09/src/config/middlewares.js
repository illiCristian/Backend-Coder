import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./passport.config.js";


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

  initializePassport()
  app.use(passport.initialize())
  app.use(passport.session())
}
export default configureMiddlewares;
