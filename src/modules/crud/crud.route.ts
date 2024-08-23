import express from "express";
import { crudController } from "./crud.controller";
import uploadImg from "../../utils/handleUpload";

const router = express.Router();

// API endpoint for crud
router.post("/crud/create", uploadImg.single('image'), crudController.createUser);

export default router;