import express from 'express';
import { authController } from './auth.controller';

const router = express.Router();

router.post('/sign-in', authController.signIn);
router.post('/refresh-token', authController.refreshToken);
router.post('/forget-password/:email', authController.forgetPassword);
router.post('/verify-otp', authController.verifyOtp);
router.post('/reset-password', authController.resetPassword);

export const authRoutes = router;