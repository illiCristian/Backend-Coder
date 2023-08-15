import passport from "passport";
import local from "passport-local";
import { validatePassword } from "../utils.js";
import GithubStrategy from "passport-github2";
import GoogleStrategy from "passport-google-oauth20";
import config from "../config/config.js";
import UserMongo from "../Dao/Manager/users.mongo.js";
import cartModel from "../Dao/models/cart.js";
import { CustomError } from "../services/customError.service.js";
import { generateUserErrorInfo } from "../services/ErrorInfo.js";
import { EError } from "../enums/Errors.js";
const LocalStrategy = local.Strategy;

const userMongo = new UserMongo();
const initializePassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await userMongo.findUserById(id);
    done(null, user);
  });
 
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age, role } = req.body;
        if (!first_name || !last_name || !email) {
          CustomError.createError({
            name: "Error",
            cause: "Faltan datos",
            message: generateUserErrorInfo(req.body),
            errorCode: EError.INVALID_JSON,
          });
        }
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
          if (!result) {
            const errorMessage = "El usuario ya existe en la base de datos";
            return done(null, false, errorMessage);
          }
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
          const user = await userMongo.login(username);
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
    "google",
    new GoogleStrategy(
      {
        clientID: config.google.clientId,
        clientSecret: config.google.clientSecret,
        callbackURL: "/api/session/googlecallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
          console.log(profile);
          const email = profile.emails[0].value;
          const user = await userMongo.findUserByEmail(email);
          const newCart = await cartModel.create({});
          if (!user) {
            const newUser = {
              first_name: profile.displayName,
              last_name: "",
              email: email,
              age: 18,
              password: "",
              cart: newCart._id,
            };
            const result = await userMongo.createUser(newUser);
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

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: config.github.clientId,
        clientSecret: config.github.clientSecret,
        callbackURL: "/api/session/githubcallback",
        scope: ["user:email"],
      },
      async (accesToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          const email = profile.emails[0].value;
          const user = await userMongo.findUserByEmail(email);
          const newCart = await cartModel.create({});
          if (!user) {
            const newUser = {
              first_name: profile._json.name,
              last_name: "",
              email: email,
              age: 18,
              password: "",
              cart: newCart._id,
            };
            const result = await userMongo.createUser(newUser);
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
