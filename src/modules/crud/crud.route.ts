import express from "express";
import { crudController } from "./crud.controller";
import uploadImg from "../../utils/handleUpload";

const router = express.Router();

// API endpoint for crud
router.post("/crud/create", uploadImg.single('image'), crudController.createCrud);
router.put("/crud/update/:id", uploadImg.single('image'), crudController.updateCrud);

export default router;