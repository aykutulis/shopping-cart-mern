import express from 'express';
import { getAccessToRoute } from '../middlewares/authMiddleware.js';
import { createOrder, getSingleOrder, updateOrderToPaid } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', [getAccessToRoute], createOrder);
router.get('/:id', [getAccessToRoute], getSingleOrder);
router.put('/:id/pay', [getAccessToRoute], updateOrderToPaid);

export default router;
