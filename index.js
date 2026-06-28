// --------------------------------------------------------------------------------------- //
// - Esta vez traté de ceñirme más a lo que pide la consigna como me había dicho, profe. - // 
// ----------------------------------------------------------------------------------------//

import app from "./app.js";

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(
    `Usando ${process.env.USE_FIREBASE === "true" ? "Firebase" : "JSON Local"} como base de datos.`,
  );
  console.log(
    `JWT Secret ${process.env.JWT_SECRET ? "está configurado." : "no está configurado."}`,
  );

});
