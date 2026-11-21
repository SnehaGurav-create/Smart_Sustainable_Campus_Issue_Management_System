import express from 'express';
import {
  register,
  login,
  demoLogin,
  getMe,
  getUsers,
  getUserById,
  createUser,
  replaceUser,
  updateUser,
  deleteUser,
} from '../controllers/authController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/demo-login', demoLogin);
router.get('/me', protect, getMe);

// Admin user administration CRUD
router.get('/users', protect, authorize('admin'), getUsers);
router.post('/users', protect, authorize('admin'), createUser);
router.get('/users/:id', protect, authorize('admin'), getUserById);
router.put('/users/:id', protect, authorize('admin'), replaceUser);
router.patch('/users/:id', protect, authorize('admin'), updateUser);
router.delete('/users/:id', protect, authorize('admin'), deleteUser);

export default router;
