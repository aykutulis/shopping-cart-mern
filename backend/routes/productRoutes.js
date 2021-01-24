import express from 'express';
import { getAccessToRoute, isAdmin } from '../middlewares/authMiddleware.js';
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getSingleProduct);
router.delete('/:id', [getAccessToRoute, isAdmin], deleteProduct);
router.post('/', [getAccessToRoute, isAdmin], createProduct);
router.put('/:id', [getAccessToRoute, isAdmin], updateProduct);

export default router;
