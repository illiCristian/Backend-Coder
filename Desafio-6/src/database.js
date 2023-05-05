import mongoose from "mongoose";

let db = null; // Variable para almacenar la conexión

(async () => {
  try {
    if (db) {
      // Si la conexión ya existe, no te conectes de nuevo
      console.log("Ya estás conectado a la base de datos");
      return db;
    } else {
      // Si la conexión no existe, conectarse y almacenar la conexión en la variable
      db = await mongoose.connect(
        "mongodb+srv://svrk73:qeS9S9bZ4oHZQuIb@cluster0.6jukxnz.mongodb.net/?retryWrites=true&w=majority"
      );
      console.log("Conectado a la base de datos");
      return db;
    }
  } catch (error) {
    console.log("Error al conectarse a la base de datos: " + error);
  }
})();

/* mongodb+srv://svrk73:qeS9S9bZ4oHZQuIb@cluster0.6jukxnz.mongodb.net/?retryWrites=true&w=majority 

db = await mongoose.connect(
        "mongodb://127.0.0.1:27017/db-test-practicaIntegradora"
      );*/
