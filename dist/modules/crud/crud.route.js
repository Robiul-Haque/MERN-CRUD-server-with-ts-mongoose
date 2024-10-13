"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crudRoutes = void 0;
const express_1 = __importDefault(require("express"));
const crud_controller_1 = require("./crud.controller");
const handleUpload_1 = __importDefault(require("../../middleware/handleUpload"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const bodyParser_1 = __importDefault(require("../../middleware/bodyParser"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const crud_validation_1 = require("./crud.validation");
const router = express_1.default.Router();
// API endpoint for crud
router.post("/create", (0, auth_1.default)(""), handleUpload_1.default.single('image'), bodyParser_1.default, (0, validateRequest_1.default)(crud_validation_1.crudValidation.crudSchema), crud_controller_1.crudController.createCrud);
router.get("/get-all", (0, auth_1.default)(""), crud_controller_1.crudController.getAllCruds);
router.put("/update/:id", (0, auth_1.default)(""), handleUpload_1.default.single('image'), bodyParser_1.default, (0, validateRequest_1.default)(crud_validation_1.crudValidation.crudSchema), crud_controller_1.crudController.updateCrud);
router.delete("/delete/:id", (0, auth_1.default)(""), crud_controller_1.crudController.deleteCrud);
exports.crudRoutes = router;
