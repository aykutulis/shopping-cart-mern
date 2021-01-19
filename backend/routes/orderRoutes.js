import express from 'express';
import { getAccessToRoute } from '../middlewares/authMiddleware.js';
import { createOrder } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', [getAccessToRoute], createOrder);

export default router;
