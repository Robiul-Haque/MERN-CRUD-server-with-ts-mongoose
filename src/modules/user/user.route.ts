import express, { NextFunction, Request, Response } from "express";
import uploadImg from "../../middleware/handleUpload";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "./user.validation";
import bodyParser from "../../middleware/bodyParser";

const router = express.Router();

// API endpoint for user
router.post("/signup", uploadImg.single('image'), bodyParser, validateRequest(UserValidation.userSchema), userController.signUp);
router.get("/get-single-user/:email", auth("admin"), userController.getSingleUser);

router.put("/user-data-update/:email", auth("user"), uploadImg.single('image'), bodyParser, validateRequest(UserValidation.updateUserSchema), userController.updateSingleUser);

export const userRoutes = router;