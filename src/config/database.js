import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DB_PATH = join(__dirname, "../../database-local.json");

console.log("VAR:", process.env.USE_FIREBASE);

let USE_FIREBASE;

if (process.env.USE_FIREBASE === 'true') {
  USE_FIREBASE = true;
} else {
  USE_FIREBASE = false;
}

// *** Configuración de JSON local *** //
const loadDatabase = () => {
  try {
    const data = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("¡Error al cargar base de datos!", error);
    return { products: [] };
  }
};

const saveDatabase = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("¡Error al salvar la base de datos!:", error);
    return false;
  }
};

// *** Elige según configuración *** //
let dbConfig;

if (USE_FIREBASE) {
   console.log("Usando servicio Firebase como base de datos...");
   const { initializeApp } = await import("firebase/app");
   const { getFirestore } = await import("firebase/firestore");

   const firebaseConfig = {
     apiKey: process.env.FIREBASE_API_KEY,
     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
     projectId: process.env.FIREBASE_PROJECT_ID,
     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
     appId: process.env.FIREBASE_APP_ID,
   };

   const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);
   dbConfig = { type: "firebase", db, loadDatabase, saveDatabase };
  } else {
        //console.log("USE_FIREBASE =", process.env.USE_FIREBASE);
        //console.log("TIPO =", typeof process.env.USE_FIREBASE);
        console.log("Usando JSON local como base de datos...");
        dbConfig = {
          type: "local",
          loadDatabase,
          saveDatabase,
          db: null,
        };
}

export { dbConfig, USE_FIREBASE };
