import multer from "multer";
import path from "path";
import __dirname from "../utils.js";

const documentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fieldname = file.fieldname; // Obtener el nombre del campo
    console.log(fieldname);

    const folders = {
      images: "profiles",
      identificacion: "identificaciones",
      domicilio: "domicilios",
      estadoDeCuenta: "estadosDeCuenta",
      products: "products",
    };

    const folderName = folders[fieldname] || "otros"; // Carpeta por defecto
    console.log(folderName);
    // Construir la ruta completa
    const destination = path.join(__dirname, `/public/documents/${folderName}`);

    cb(null, destination);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${req.session?.user.email}-document-${new Date().getMinutes()}${
        file.originalname
      }`
    );
  },
});

export const uploaderDocument = multer({ storage: documentStorage });

/* const documentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, path.join(__dirname, "/public/documents"));
  },
  filename: function (req, file, cb) {
    console.log("req.body");
    console.log(req.session?.user);
    console.log("req.body");
    cb(null, `${req.session?.user.email}-document-${file.originalname}`);
  },
});

export const uploaderDocument = multer({ storage: documentStorage });
 */
