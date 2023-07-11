import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./passport.config.js";
import config from "./config.js";

//const db = "users";
const MONGO = config.mongo.url;
const SECRET_SESSION = config.server.secretSession;
function configureMiddlewares(app) {
  app.use(
    session({
      store: new MongoStore({
        mongoUrl: MONGO,
        ttl: 3600,
      }),
      secret: SECRET_SESSION,
      resave: false,
      saveUninitialized: false,
    })
  );

  initializePassport();
  app.use(passport.initialize());
  app.use(passport.session());
}
export default configureMiddlewares;
