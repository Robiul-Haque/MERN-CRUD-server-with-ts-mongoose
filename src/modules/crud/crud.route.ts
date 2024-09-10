import express from "express";
import { crudController } from "./crud.controller";
import uploadImg from "../../utils/handleUpload";

const router = express.Router();

// API endpoint for crud
router.post("/create", uploadImg.single('image'), crudController.createCrud);
router.get("/get-all", crudController.getAllCruds);
router.put("/update/:id", uploadImg.single('image'), crudController.updateCrud);
router.delete("/delete/:id", crudController.deleteCrud);

export const crudRoutes = router;