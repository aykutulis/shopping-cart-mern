import express from 'express';
import { getAccessToRoute, isAdmin } from '../middlewares/authMiddleware.js';
import { imageUpload } from '../middlewares/uploadImage.js';
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  getTopProducts,
  updateProduct,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/top', getTopProducts);
router.get('/:id', getSingleProduct);
router.delete('/:id', [getAccessToRoute, isAdmin], deleteProduct);
router.post('/', [getAccessToRoute, isAdmin], createProduct);
router.put('/:id', [getAccessToRoute, isAdmin, imageUpload.single('image')], updateProduct);
router.post('/:id/reviews', [getAccessToRoute], createProductReview);

export default router;
