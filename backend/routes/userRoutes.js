import express from 'express';
import { getAccessToRoute } from '../middlewares/authMiddleware.js';
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', authUser);
router.get('/profile', [getAccessToRoute], getUserProfile);
router.put('/profile', [getAccessToRoute], updateUserProfile);

export default router;
