import express from 'express';
import productRoutes from './productRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use('/products', productRoutes);
router.use('/users', userRoutes);

export default router;
