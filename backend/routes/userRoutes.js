import express from 'express';
import { getAccessToRoute, isAdmin } from '../middlewares/authMiddleware.js';
import { authUser, deleteUser, getAllUsers, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.post('/', registerUser);
router.get('/', [getAccessToRoute, isAdmin], getAllUsers);
router.post('/login', authUser);
router.get('/profile', [getAccessToRoute], getUserProfile);
router.put('/profile', [getAccessToRoute], updateUserProfile);
router.delete('/:id', [getAccessToRoute, isAdmin], deleteUser);

export default router;
