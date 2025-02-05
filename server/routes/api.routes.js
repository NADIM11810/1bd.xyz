import express from 'express';
import { fetchData } from '../controllers/api.controller.js';

const router = express.Router();

router.get('/dada', fetchData);

export default router;
