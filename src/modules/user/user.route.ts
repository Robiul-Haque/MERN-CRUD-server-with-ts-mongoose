import express from "express";
import uploadImg from "../../utils/handleUpload";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();

// API endpoint for user
router.post("/signup", uploadImg.single('image'), userController.signUp);
router.get("/get-single-user/:email", auth, userController.getSingleUser);

export const userRoutes = router;