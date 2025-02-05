import express from 'express';
import { createNotice, getAllNotices } from '../controllers/notice.controller.js';

const router = express.Router();

router.post('/notices', createNotice);

router.get('/notices', getAllNotices);

export default router;
