import express from "express";
import { extractBirthInfo } from "../controllers/openai.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/extract-birth-info", extractBirthInfo);

export default router; 
