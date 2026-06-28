import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new Error("El token es inválido o ya expiró.");
  }
};