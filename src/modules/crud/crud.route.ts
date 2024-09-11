import express from "express";
import { crudController } from "./crud.controller";
import uploadImg from "../../utils/handleUpload";
import auth from "../../middleware/auth";

const router = express.Router();

// API endpoint for crud
router.post("/create", auth, uploadImg.single('image'), crudController.createCrud);
router.get("/get-all", auth, crudController.getAllCruds);
router.put("/update/:id", auth, uploadImg.single('image'), crudController.updateCrud);
router.delete("/delete/:id", auth, crudController.deleteCrud);

export const crudRoutes = router;