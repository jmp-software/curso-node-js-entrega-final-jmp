import { Router } from "express";

import { homeAnswer } from "../controllers/home.controller.js";

const router = Router();

router.get("/", homeAnswer);

export default router;
