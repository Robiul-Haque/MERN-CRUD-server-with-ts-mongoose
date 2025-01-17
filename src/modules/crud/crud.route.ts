import express from "express";
import { crudController } from "./crud.controller";
import uploadImg from "../../middleware/handleUpload";
import auth from "../../middleware/auth";
import bodyParser from "../../middleware/bodyParser";
import validateRequest from "../../middleware/validateRequest";
import { crudValidation } from "./crud.validation";

const router = express.Router();

// API endpoint for crud

// Create a new resource.
router.post("/create", auth(""), uploadImg.single('image'), bodyParser, validateRequest(crudValidation.crudSchema), crudController.createCrud);

// Retrieve all resources.
router.get("/get-all", auth(""), crudController.getAllCruds);

// Retrieve a single resource by its ID.
router.get("/get-single-crud/:id", auth(""), crudController.getSingleCrud);

// Update an existing resource by its ID.
router.put("/update/:id", auth(""), uploadImg.single('image'), bodyParser, validateRequest(crudValidation.crudSchema), crudController.updateCrud);

// Delete a resource by its ID.
router.delete("/delete/:id", auth(""), crudController.deleteCrud);

export const crudRoutes = router;