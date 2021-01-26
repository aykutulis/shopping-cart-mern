import express from 'express';
import { getAccessToRoute, isAdmin } from '../middlewares/authMiddleware.js';
import {
  createOrder,
  getSingleOrder,
  updateOrderToPaid,
  getOrdersOfUser,
  getOrders,
  updateOrderToDelivered,
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/', [getAccessToRoute], createOrder);
router.get('/', [getAccessToRoute, isAdmin], getOrders);
router.get('/ordersofuser', [getAccessToRoute], getOrdersOfUser);
router.get('/:id', [getAccessToRoute], getSingleOrder);
router.put('/:id/pay', [getAccessToRoute], updateOrderToPaid);
router.get('/:id/deliver', [getAccessToRoute, isAdmin], updateOrderToDelivered);

export default router;
