import { verifyToken } from "../utils/token.generator.js";

export const authenticate = (req, res, next) => {
  
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "No está autorizado.",
        message: "No fue proporcionado el token de autenticación.",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    req.user = decoded;
    next();

  } catch (error) {
    
    return res.status(403).json({
      error: "¡Acceso denegado!",
      message: error.message,
    });

  }
  
};
