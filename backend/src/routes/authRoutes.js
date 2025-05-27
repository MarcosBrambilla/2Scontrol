import express from 'express';
import authController from '../controllers/authController.js';
const router = express.Router();

router.post('/register', authController.register)
router.post('/login', authController.login);

const authRoutes = router;
export default authRoutes;