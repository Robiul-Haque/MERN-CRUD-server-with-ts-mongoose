import express from "express";
import uploadImg from "../../middleware/handleUpload";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();

// API endpoint for user
router.post("/signup", uploadImg.single('image'), userController.signUp);
router.get("/get-single-user/:email", auth, userController.getSingleUser);
router.put("/user-data-update/:email", auth, uploadImg.single('image'), userController.updateSingleUser);

export const userRoutes = router;