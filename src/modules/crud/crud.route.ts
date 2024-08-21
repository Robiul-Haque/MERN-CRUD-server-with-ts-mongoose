import express from "express";
import { crudController } from "./crud.controller";

const router = express.Router();

// API endpoint for crud
router.post("/create", crudController.createUser);

export default router