import * as productService from "../services/products.service.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      error: "Error interno en el servidor.",
      message: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    res.status(200).json(product);
  } catch (error) {
    if (error.message === "Producto no encontrado") {
      res.status(404).json({
        error: "No se encontró.",
        message: error.message,
      });
    } else {
      res.status(500).json({
        error: "Error interno en el servidor.",
        message: error.message,
      });
    }
  }
};

export const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = await productService.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    if (
      error.message.includes("inválido")
    ) {
      res.status(400).json({
        error: "Error en la validación.",
        message: error.message,
      });
    } else {
      res.status(500).json({
        error: "Error interno en el servidor.",
        message: error.message,
      });
    }
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    const updatedProduct = await productService.updateProduct(id, productData);
    res.status(200).json(updatedProduct);
  } catch (error) {
    if (error.message === "Producto no encontrado.") {
      res.status(404).json({
        error: "No se encontró.",
        message: error.message,
      });
    } else if (error.message.includes("requeridos")) {
      res.status(400).json({
        error: "Error de validación",
        message: error.message,
      });
    } else {
      res.status(500).json({
        error: "Error interno del servidor",
        message: error.message,
      });
    }
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productService.deleteProduct(id);
    res.status(200).json({
      message: "Producto eliminado exitosamente",
      product: result,
    });
  } catch (error) {
    if (error.message === "Producto no encontrado.") {
      res.status(404).json({
        error: "No encontrado",
        message: error.message,
      });
    } else {
      res.status(500).json({
        error: "Error interno del servidor",
        message: error.message,
      });
    }
  }
};
