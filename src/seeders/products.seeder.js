import localDatabase from "../../database-firestore.json" with { type: "json" };
import firestoreDatabase from "../config/firebase.js";
import { collection, addDoc } from "firebase/firestore";

const products = localDatabase.products;
const productsCollection = collection(firestoreDatabase, "products");

const generateProducts = async () => {
  products.forEach(async (product) => {
    await addDoc(productsCollection, product);
  });

  console.log("Cargando productos...");

};

generateProducts();

//console.log(localDatabase);
//console.log(products);