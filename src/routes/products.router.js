import { Router } from "express";

import * as productsController from "../controllers/products.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate); // Todas requieren autenticación de admin

router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getProductById);
router.post("/create", productsController.createProduct);
//router.put("/:id", productsController.updateProduct);
router.patch("/:id", productsController.updateProduct);
router.delete("/:id", productsController.deleteProduct);

export default router;
