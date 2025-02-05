import express from "express";
import {
  updateApply,
  submitForm,
  getAllApplications,
  getApplicationsByUserId,
  updateNoteAndStatus,
  getApi,
  getApiBackup,
  deleteAllOrders,
  createRoshid,
  getRoshid,
  deleteRoshid,
  updateToggleOrder,
  getToggleOrder,
  getRoshidById,
  updateRoshid,
} from "../controllers/apply.controller.js";
import { uploder } from "../middleware/uploder.js";
import protectRoute from "../middleware/protectRoute.js";
import { uploadSingle } from "../middleware/uploadSingle.js";
const router = express.Router();

router.post(
  "/update-form/:id",
  protectRoute,
  uploder.single("file"),
  uploadSingle,
  updateApply
);
router.post("/order", protectRoute, submitForm);
router.get("/order", protectRoute, getAllApplications);
router.post("/create-roshid", protectRoute, createRoshid);
router.get("/get-roshid", protectRoute, getRoshid);
router.get("/push", getApi);
router.get("/push-backup", getApiBackup);
router.put("/order/:id", updateNoteAndStatus);
router.put("/toggle-order", updateToggleOrder);
router.get("/toggle-order", getToggleOrder);
router.get("/my-order", protectRoute, getApplicationsByUserId);
router.delete("/delete-all-orders", protectRoute, deleteAllOrders);
router.delete("/delete-roshid", protectRoute, deleteRoshid);
router.get("/get-roshid/:id", getRoshidById);
router.put("/update-roshid/:id", protectRoute, updateRoshid);

export default router;
