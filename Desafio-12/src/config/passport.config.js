import passport from "passport";
import local from "passport-local";
import userModel from "../Dao/models/user.js";
import { createHash, validatePassword } from "../utils.js";
import GithubStrategy from "passport-github2";
import cartModel from "../Dao/models/cart.js";
import config from "../config/config.js";
import UserMongo from "../Dao/Manager/users.mongo.js";
const LocalStrategy = local.Strategy;

const userMongo = new UserMongo();
const initializePassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });

  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age, role } = req.body;
        try {
          const result = await userMongo.register(
            first_name,
            last_name,
            email,
            age,
            role,
            password,
            username
          );
          return done(null, result);
        } catch (error) {
          return done("Error al registrar el usuario: " + error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username }).exec();
          //console.log(user);
          if (!user) {
            console.log("No existe el usuario");
            return done(null, false);
          }
          if (!validatePassword(password, user)) return done(null, false);
          return done(null, user);
        } catch (error) {
          return done("Error al intentar ingresar: " + error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: config.github.clientId,
        clientSecret: config.github.clientSecret,
        callbackURL: "http://localhost:8080/api/session/githubcallback",
        scope: ["user:email"],
      },
      async (accesToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          const email = profile.emails[0].value;
          const user = await userModel.findOne({ email }).exec();
          if (!user) {
            const newUser = {
              first_name: profile._json.name,
              last_name: "",
              email: email,
              age: 18,
              password: "",
            };
            const result = await userModel.create(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(null, error);
        }
      }
    )
  );
};

export default initializePassport;
