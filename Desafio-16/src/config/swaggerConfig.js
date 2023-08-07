import __dirname from "../utils.js";
import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentacion backend creada por Cristian Illi",
      version: "1.0.1",
      descriptiom: "Definición de la API",
    },
  },
  apis: [`${path.join(__dirname, "docs/**/*.yaml")}`],
};


export const swaggerSpec = swaggerJSDoc(swaggerOptions);
