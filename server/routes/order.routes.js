import express from 'express';
import { updateApply } from '../controllers/apply.controller.js';

const router = express.Router();
router.put('/update-form/:id', updateApply);

export default router;