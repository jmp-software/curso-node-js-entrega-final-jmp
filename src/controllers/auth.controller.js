import { login } from "../services/auth.service.js";

export const loginUser = async (req, res) => {
  try {
    const result = await login(req.body);

    return res.status(200).json({
      message: "¡Logueo exitoso!",
      token: result.token,
      user: result.user,
    });

  } catch (error) {

    if (error.message === "Faltan correo-e o contraseña.") {
      return res.status(400).json({
        error: "Error en la autenticación.",
        message: error.message,
      });
    }

    if (error.message === "Credenciales incorrectas.") {
      return res.status(401).json({
        error: "Error en la autenticación.",
        message: error.message,
      });
    }

    return res.status(500).json({
      error: "Error interno en el servidor.",
      message: error.message
    });
  }
};