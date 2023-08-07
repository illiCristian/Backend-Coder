import dotenv from "dotenv";
import { Command } from "commander";
import path from "path";

const program = new Command();

program.option("-mode <modo>", "Modo de inicio", "dev");
program.parse();

const environment = program.opts();

console.log(environment);

const pathEnvironment =
  environment.mode === "prod"
    ? path.join(process.cwd(), ".env.production")
    : path.join(process.cwd(), ".env.development");

dotenv.config({ path: pathEnvironment, debug: true });

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
    emailToken: process.env.SECRET_TOKEN_EMAIL,
    adminAccount: process.env.ADMIN_EMAIL,
    adminPass: process.env.ADMIN_PASS,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  nodeEnv: NODE_ENV,
};

export default config;
