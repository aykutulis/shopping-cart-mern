import express from 'express';
import { getAccessToRoute } from '../middlewares/authMiddleware.js';
import { createOrder, getSingleOrder } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', [getAccessToRoute], createOrder);
router.get('/:id', [getAccessToRoute], getSingleOrder);

export default router;
