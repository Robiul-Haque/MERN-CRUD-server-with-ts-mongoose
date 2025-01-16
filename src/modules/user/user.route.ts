import express from "express";
import uploadImg from "../../middleware/handleUpload";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { userValidation } from "./user.validation";
import bodyParser from "../../middleware/bodyParser";

const router = express.Router();

// API endpoint for user

// Endpoint for user registration. Handles image upload, validates request body, and creates a new user.
router.post("/signup", uploadImg.single('image'), bodyParser, validateRequest(userValidation.userSchema), userController.signUp);

// Fetches a single user's data by email.
router.get("/get-single-user/:email", auth(""), userController.getSingleUser);

// Updates a single user's data by email. Handles image upload, validates request body, and updates the user's data.
router.put("/user-data-update/:email", auth(""), uploadImg.single('image'), bodyParser, validateRequest(userValidation.updateUserSchema), userController.updateSingleUser);

export const userRoutes = router;