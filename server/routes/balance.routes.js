import express from "express";
import {
  createBalance,
  getBalance,
  updateNidBalance,
  updateServerBalance,
  updateBirthBalance,
  updateTinBalance,
  updateBioBalance,
  updateRoshidBalance,
  updateEditRoshidBalance,
} from "../controllers/balance.controller.js";

const router = express.Router();

router.post("/create", createBalance);

router.post("/update-nid-balance", updateNidBalance);

router.post("/update-server-balance", updateServerBalance);

router.post("/update-birth-balance", updateBirthBalance);

router.post("/update-tin-balance", updateTinBalance);

router.post("/update-bio-balance", updateBioBalance);

router.post("/update-roshid-balance", updateRoshidBalance);

router.post("/update-edit-roshid-balance", updateEditRoshidBalance);

router.get("/", getBalance);

export default router;
