import express from 'express';
import { getAccessToRoute, isAdmin } from '../middlewares/authMiddleware.js';
import { deleteProduct, getAllProducts, getSingleProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getSingleProduct);
router.delete('/:id', [getAccessToRoute, isAdmin], deleteProduct);

export default router;
