import passport from "passport";
import local from "passport-local";
import userModel from "../Dao/models/User.model.js";
import { createHash, generateToken, validatePassword } from "../utils.js";
import GithubStrategy from "passport-github2"
const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });

  passport.use("register", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, username, password, done) => {
      const { first_name, last_name, email, age } = req.body;
      try {
        const user = await userModel.findOne({ email: username }).exec();
        if (user) {
          console.log("El usuario existe");
          return done(null, false);
        }
        const newUser = {
          first_name,
          last_name,
          email,
          age,
          password: createHash(password)
        }
        const accessToken = generateToken(user)
        const result = await userModel.create(newUser);
        return done(null, result);
      } catch (error) {
        return done("Error al registrar el usuario: " + error);
      }
    }
  ));

  passport.use("login", new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {

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
  }))

  passport.use("github", new GithubStrategy({
    clientID: "Iv1.45dc0b160a891d61",
    clientSecret: "d8316b1e198b8d64716534fdb2d06faefd4617a9",
    callbackURL: "http://localhost:8080/api/session/githubcallback"
  }, async (accesToken, refreshToken, profile, done) => {
    try {
      console.log(profile);
      const email = profile._json.email == null ? profile._json.username : null;
      const user = await userModel.findOne({ email: profile._json.email }).exec();
      if (!user) {
        const newUser = {
          first_name: profile._json.name,
          last_name: "",
          email: email,
          age: 18,
          password: ""
        }
        const result = await userModel.create(newUser).exec();
        done(null, result)

      } else {
        done(null, user)
      }
    } catch (error) {
      return done(null, error)
    }
  }))

}

export default initializePassport;