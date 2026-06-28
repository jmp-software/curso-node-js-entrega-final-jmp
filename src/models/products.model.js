import { dbConfig, USE_FIREBASE } from "../config/database.js";

let modelFunctions;

// *** Versión Firebase *** //
if (USE_FIREBASE) {
  const { collection, getDocs, getDoc, doc, addDoc, deleteDoc, updateDoc } =
    await import("firebase/firestore");
  const COLLECTION_NAME = "products";

  modelFunctions = {
    getAllProducts: async () => {
      try {
        const productsCollection = collection(dbConfig.db, COLLECTION_NAME);
        const productsSnapshot = await getDocs(productsCollection);
        const products = [];
        productsSnapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() });
        });
        return products;
      } catch (error) {
        throw new Error(`Error obteniendo productos: ${error.message}.`);
      }
    },

    getProductById: async (id) => {
      try {
        const productDoc = doc(dbConfig.db, COLLECTION_NAME, id);
        const productSnapshot = await getDoc(productDoc);
        if (!productSnapshot.exists()) {
          return null;
        }
        return { id: productSnapshot.id, ...productSnapshot.data() };
      } catch (error) {
        throw new Error(`Error obteniendo producto: ${error.message}.`);
      }
    },

    createProduct: async (productData) => {
      try {
        const productsCollection = collection(dbConfig.db, COLLECTION_NAME);
        const docRef = await addDoc(productsCollection, {
          ...productData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        return { id: docRef.id, ...productData };
      } catch (error) {
        throw new Error(`Error creando producto: ${error.message}.`);
      }
    },

    updateProduct: async (id, productData) => {
      try {
        const productDoc = doc(dbConfig.db, COLLECTION_NAME, id);
        await updateDoc(productDoc, {
          ...productData,
          updatedAt: new Date().toISOString(),
        });
        return { id, ...productData };
      } catch (error) {
        throw new Error(`Error actualizando producto: ${error.message}.`);
      }
    },

    deleteProduct: async (id) => {
      try {
        const productDoc = doc(dbConfig.db, COLLECTION_NAME, id);
        await deleteDoc(productDoc);
        return { id, deleted: true };
      } catch (error) {
        throw new Error(`Error eliminando producto: ${error.message}.`);
      }
    },
  };
  
   // *** Versión JSON Local *** //
} else {
  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 6);
  };

  modelFunctions = {
    getAllProducts: async () => {
      try {
        const data = dbConfig.loadDatabase();
        return data.products || [];
      } catch (error) {
        throw new Error(`Error obteniendo productos: ${error.message}.`);
      }
    },

    getProductById: async (id) => {
      try {
        const data = dbConfig.loadDatabase();
        const product = data.products.find((p) => p.id === id);
        return product || null;
      } catch (error) {
        throw new Error(`Error obteniendo producto: ${error.message}.`);
      }
    },

    createProduct: async (productData) => {
      try {
        const data = dbConfig.loadDatabase();
        const newProduct = {
          id: generateId(),
          ...productData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        data.products.push(newProduct);
        dbConfig.saveDatabase(data);
        return newProduct;
      } catch (error) {
        throw new Error(`Error creando producto: ${error.message}.`);
      }
    },

    updateProduct: async (id, productData) => {
      try {
        const data = dbConfig.loadDatabase();
        const index = data.products.findIndex((p) => p.id === id);
        if (index === -1) {
          throw new Error("Producto no se encontró.");
        }
        const updatedProduct = {
          ...data.products[index],
          ...productData,
          id: id,
          updatedAt: new Date().toISOString(),
        };
        data.products[index] = updatedProduct;
        dbConfig.saveDatabase(data);
        return updatedProduct;
      } catch (error) {
        throw new Error(`Error actualizando producto: ${error.message}.`);
      }
    },

    deleteProduct: async (id) => {
      try {
        const data = dbConfig.loadDatabase();
        const index = data.products.findIndex((p) => p.id === id);
        if (index === -1) {
          throw new Error("Producto no se encontró.");
        }
        data.products.splice(index, 1);
        dbConfig.saveDatabase(data);
        return { id, deleted: true };
      } catch (error) {
        throw new Error(`Error eliminando producto: ${error.message}.`);
      }
    },
  };
}

export const getAllProducts = modelFunctions.getAllProducts;
export const getProductById = modelFunctions.getProductById;
export const createProduct = modelFunctions.createProduct;
export const updateProduct = modelFunctions.updateProduct;
export const deleteProduct = modelFunctions.deleteProduct;
