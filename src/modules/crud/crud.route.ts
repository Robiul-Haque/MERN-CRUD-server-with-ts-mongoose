import express from "express";
import { crudController } from "./crud.controller";
import uploadImg from "../../middleware/handleUpload";
import auth from "../../middleware/auth";
import bodyParser from "../../middleware/bodyParser";
import validateRequest from "../../middleware/validateRequest";
import { crudValidation } from "./crud.validation";

const router = express.Router();

// API endpoint for crud
router.post("/create", auth(""), uploadImg.single('image'), bodyParser, validateRequest(crudValidation.crudSchema), crudController.createCrud);
router.get("/get-all", auth(""), crudController.getAllCruds);
router.put("/update/:id", auth(""), uploadImg.single('image'), bodyParser, validateRequest(crudValidation.crudSchema), crudController.updateCrud);
router.delete("/delete/:id", auth(""), crudController.deleteCrud);

export const crudRoutes = router;