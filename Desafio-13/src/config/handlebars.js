import handlebars from "express-handlebars";
import path from "path";
import __dirname, { readJSON } from "../utils.js";

export default function configureHandlebars(app) {
  const hbs = handlebars.create({
    partialsDir: path.join(path.join(__dirname), "/views/partials"),
    helpers: {
      readJSON: readJSON,
      isAdmin: function (role) {
        return role === "admin";
      },
    },
    allowProtoPropertiesInData: true,
  });

  app.engine("handlebars", hbs.engine);
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "handlebars");
}
