import express from 'express';
import { authController } from './auth.controller';

const router = express.Router();

// Route for user sign-in.
router.post('/sign-in', authController.signIn);

// Route for user refresh token.
router.post('/refresh-token', authController.refreshToken);

// Route for user forget password.
router.post('/forget-password/:email', authController.forgetPassword);

// Route for user verify OTP.
router.post('/verify-otp', authController.verifyOtp);

// Route for user reset password.
router.post('/reset-password', authController.resetPassword);

export const authRoutes = router;