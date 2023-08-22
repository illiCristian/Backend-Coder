import multer from "multer";
import path from "path";
import __dirname from "../utils.js";

const documentStorage = multer.diskStorage({
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
