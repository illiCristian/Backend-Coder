import handlebars from "express-handlebars";
import path from "path";
import __dirname, { readJSON } from "../utils.js";

export default function configureHandlebars(app) {
  const hbs = handlebars.create({
    partialsDir: path.join(app.get("views"), "partials"),
    helpers: {
      readJSON: readJSON,
    },
    allowProtoPropertiesInData: true,
  });

  app.engine("handlebars", hbs.engine);
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "handlebars");
}
