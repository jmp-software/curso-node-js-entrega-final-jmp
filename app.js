import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRoutes from "./src/routes/products.router.js";
import authRoutes from "./src/routes/auth.router.js";
import homeRoutes from "./src/routes/home.router.js";

dotenv.config();

const app = express();

// *** Carpueta pública par el favicon *** //
app.use(express.static('public'));

// *** Middleware *** //
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// *** Rutas *** //
app.use("/api/products", productsRoutes);
app.use("/auth", authRoutes);
app.use("/", homeRoutes);


// *** Rutas no encontradas *** //
app.get("/", (req, res) => {
  res.json({
    message: "URL de la API para la tienda en línea Vintageware.com.ar"
  });
});


app.use((req, res) => {
  /*
  if (req.method === "GET" && req.url === "/") {
    res.json({
      message: "URL de la API para la tienda en línea Vintageware.com.ar"
    })
  }
  else {*/
    res.status(404).json({
      error: "Ruta no encontrada",
      message: `La ruta ${req.method} ${req.url} no existe.`,
    });
 // }
});

export default app;

/*
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRoutes from "./src/routes/products.routes.js";
import authRoutes from "./src/routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; // Si no lo toma automáticamente, usae el puerto "3001"

// *** Middlewares *** // 
// No usé el bodyparser como se dijo en clase
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// *** Rutas *** //
app.use("/api/products", productsRoutes);
app.use("/auth", authRoutes);

// *** Rutas no encontradas *** //
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    message: `La ruta ${req.method} ${req.url} no existe.`,
  });
});

// *** Inicia el servidor *** //
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(
    `Usando ${process.env.USE_FIREBASE === "true" ? "Firebase" : "JSON Local"} como base de datos.`,
  );
  console.log(
    `JWT Secret ${process.env.JWT_SECRET ? "está configurado." : "no está configurado."}`,
  );
});
*/