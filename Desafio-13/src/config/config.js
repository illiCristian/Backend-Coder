import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const CORREO_ADMIN = process.env.CORREO_ADMIN;
const PASSWORD_ADMIN = process.env.PASSWORD_ADMIN;
const SECRET_SESSION = process.env.SECRET_SESSION;
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
};

export default config;
