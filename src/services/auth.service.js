import { generateToken } from "../utils/token.generator.js";

// Hardcodeé un "USER" que no es admin, podrían
// ir varios ahí a futuro, lo mismo en "ADMIN"
// Igual no lo usé al final
// El token se requiere para todo igual
// Salvo para el get del "home" por cuestiones obvias

//*** Usuarios válidos *** //
const ADMIN = { email: "administrador@vintageware.com.ar", password: "admin_1234", role: "admin", tokenVer: 1 }
const USER = { email: "usuario@vintageware.com.ar", password: "user_1234", role: "user", tokenVer: 1 };

export const login = async (credentials) => {
  const { email, password } = credentials;

  if (!email || !password) {
    // Me gusta castellanizar todo, por eso le puse "correo-e" (antes se usaba igual, como en los noventa jaja)
    const error = new Error("Faltan correo-e o contraseña.");
    error.statusCode = 400;
    throw error;
  }

  let user = null;

  if (ADMIN.email === email && ADMIN.password === password) {
    user = ADMIN;
  } else if (USER.email === email && USER.password === password) {
    user = USER;
  }

  if (!user) {
    const error = new Error("Credenciales incorrectas.");
    error.statusCode = 401;
    throw error;
  }

  // *** Genera token JWT y lo puse que expire en 24 horas para probarlo cómodo *** //
  const token = generateToken(user);

  return {
    token,
    user: {
      email: user.email,
      role: user.role
    },
  };

};



