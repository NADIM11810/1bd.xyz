import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  getUsersForSidebar,
  findUserById,
  updateBalance,
  updatePassword,
  deleteUserById,
  updateBalanceForServer,
  updateBalanceForNid,
  updateBalanceForBirth,
  updateBalanceForTin,
  updateBalanceForBio,
  updateBalanceForRoshid,
  updateUserBalance,
  editUserBalance,
  getRoshidById,
  updateBalanceForEditedRoshid,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.get("/userInfo", protectRoute, findUserById);
router.put("/update-user-balance", updateUserBalance);
router.put("/edit-user-balance", protectRoute, editUserBalance);
router.put("/update-balance", protectRoute, updateBalance);
router.put("/update-balance-server", protectRoute, updateBalanceForServer);
router.put("/update-balance-nid", protectRoute, updateBalanceForNid);
router.put("/update-balance-birth", protectRoute, updateBalanceForBirth);
router.put("/update-balance-tin", protectRoute, updateBalanceForTin);
router.put("/update-balance-bio", protectRoute, updateBalanceForBio);
router.put("/update-balance-roshid", protectRoute, updateBalanceForRoshid);
router.put(
  "/update-edit-balance-roshid",
  protectRoute,
  updateBalanceForEditedRoshid
);
router.put("/update-password", protectRoute, updatePassword);
router.delete("/users/:userId", protectRoute, deleteUserById);
router.get("/get-roshid/:id", getRoshidById);

export default router;
