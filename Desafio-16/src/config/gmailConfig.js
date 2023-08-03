import nodemailer from "nodemailer";
import config from "./config.js";

const adminEmail = config.gmail.adminAccount;
const adminPass = config.gmail.adminPass;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: adminEmail,
    pass: adminPass,
  },
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendRecoveryPass = async (userEmail, token) => {
  const link = `http://localhost:8080/resetpassword?token=${token}`;
  try {
    const res = await transporter.sendMail({
      from: adminEmail,
      to: userEmail,
      subject: "Restablecer contraseña",
      html: `
        <div>
        <h2>Has solicitado un cambio de contraseña.</h2>
        <p>Da clic en el siguiente enlace para restableces la contraseña</p>
        <a href="${link}">
        <button> Restablecer contraseña </button>
        </a>        
        </div>
        `,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const sendContactEmail = async (userEmail) => {
  try {
    const res = await transporter.sendMail({
      from: adminEmail,
      to: userEmail,
      subject: "Contacto",
      html: `
        <div>
        <h2>Has solicitado un contacto  .</h2>
        <p>Uno de nuestros representastes le contactara en breve</p>
        <p>Gracias por confiar en nosotros</p>      
        </div>
        `,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export default transporter;
