import express from "express";
import uploadImg from "../../utils/handleUpload";
import { userController } from "./user.controller";

const router = express.Router();

// API endpoint for user
router.post("/create", uploadImg.single('image'), userController.signUp);
router.get("/get-single-user/:email", userController.getSingleUser);

export const userRoutes = router;