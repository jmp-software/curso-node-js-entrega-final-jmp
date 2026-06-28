import * as productModel from "../models/products.model.js";

export const getAllProducts = async () => {
  return await productModel.getAllProducts();
};

export const getProductById = async (id) => {
  if (!id) {
    throw new Error("Falta ID del producto.");
  }
  const product = await productModel.getProductById(id);
  if (!product) {
    throw new Error("Producto no encontrado");
  }
  return product;
};

export const createProduct = async (productData) => {
  /*
  "id": "Orho94djDZokDrl62oUG",
  "price": 45000,
  "stock": 27,
  "description": "Versión original completa en castellano 2.18",
  "platform": "Windows",
  "media": "CD-ROM",
  "title": "Malvinas 2032 - Es hora de recuperar lo nuestro",
  "short_title": "Malvinas 2032",
  "image": "https://i.ibb.co/27DnPCGw/portadamalvinas.jpg"
  */
  const {
    price,
    stock,
    description,
    platform,
    media,
    title,
    short_title,
    image,
  } = productData;

  if (!title || price === undefined || stock === undefined || !description || !platform || !media || !short_title || !image) {
    throw new Error("Faltan campos.");
  }
  
  if (typeof price !== "number" || price <= 0) {
    throw new Error("Precio inválido.");
  }
  
  if (typeof stock !== "number" || stock < 0) {
    throw new Error("Stock inválido.");
  }
  
  if (typeof title !== "string" || title.trim().length === 0) {
    throw new Error("Título inválido.");
  }
  
  if (typeof description !== "string" || description.trim().length === 0) {
    throw new Error("Descripción inválida.");
  }
  
  if (typeof platform !== "string" || platform.trim().length === 0) {
    throw new Error("Plataforma inválida.");
  }
  
  if (typeof media !== "string" || media.trim().length === 0) {
    throw new Error("Medio inválido.");
  }
  
  if (typeof short_title !== "string" || short_title.trim().length === 0) {
    throw new Error("Título corto inválido.");
  }
  
  if (typeof image !== "string" || image.trim().length === 0) {
    throw new Error("Imagen inválida.");
  }
  
  return await productModel.createProduct(productData);
};

export const updateProduct = async (id, productData) => {
  if (!id) {
    throw new Error("Falta ID del producto.");
  }

  const existingProduct = await productModel.getProductById(id);
  if (!existingProduct) {
    throw new Error("Producto no encontrado");
  }

  return await productModel.updateProduct(id, productData);
};

export const deleteProduct = async (id) => {
  if (!id) {
    throw new Error("Falta ID del producto.");
  }

  const existingProduct = await productModel.getProductById(id);
  if (!existingProduct) {
    throw new Error("Producto no encontrado.");
  }

  return await productModel.deleteProduct(id);
};