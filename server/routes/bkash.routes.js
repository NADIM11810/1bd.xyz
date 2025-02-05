import express from "express";
import {
  createPayment,
  paymentCallback,
} from "../controllers/bkash.controller.js";
import bkashAuth from "../middleware/bkashAuth.js";
const router = express.Router();

router.post("/create-payment", bkashAuth, createPayment);
router.get("/callback", bkashAuth, paymentCallback);

export default router;
