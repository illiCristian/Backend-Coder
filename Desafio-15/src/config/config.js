import dotenv from "dotenv";
import { Command } from "commander";
import path from "path";
import __dirname from "../utils.js";
const program = new Command();

program.option("-mode <modo>", "Modo de inicio", "dev");
program.parse(); // Se cierra la configuracion

const environment = program.opts();

console.log(`${environment} Environment`);

const pathEnvironment =
  environment.Mode === "prod"
    ? path.join(__dirname, "../.env.production")
    : path.join(__dirname, "../.env.development");

dotenv.config({ path: pathEnvironment });

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const CORREO_ADMIN = process.env.CORREO_ADMIN;
const PASSWORD_ADMIN = process.env.PASSWORD_ADMIN;
const SECRET_SESSION = process.env.SECRET_SESSION;
const NODE_ENV = process.env.NODE_ENV;
const config = {
  server: {
    port: PORT,
    secretSession: SECRET_SESSION,
  },
  mongo: {
    url: MONGO_URL,
  },
  auth: {
    account: CORREO_ADMIN,
    pass: PASSWORD_ADMIN,
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  },
  gmail: {
    adminAccount: process.env.ADMIN_EMAIL,
    adminPass: process.env.ADMIN_PASS,
  },
  nodeEnv: NODE_ENV,
};

export default config;
