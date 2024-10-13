"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const handleUpload_1 = __importDefault(require("../../middleware/handleUpload"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_validation_1 = require("./user.validation");
const bodyParser_1 = __importDefault(require("../../middleware/bodyParser"));
const router = express_1.default.Router();
// API endpoint for user
router.post("/signup", handleUpload_1.default.single('image'), bodyParser_1.default, (0, validateRequest_1.default)(user_validation_1.userValidation.userSchema), user_controller_1.userController.signUp);
router.get("/get-single-user/:email", (0, auth_1.default)("admin"), user_controller_1.userController.getSingleUser);
router.put("/user-data-update/:email", (0, auth_1.default)("user"), handleUpload_1.default.single('image'), bodyParser_1.default, (0, validateRequest_1.default)(user_validation_1.userValidation.updateUserSchema), user_controller_1.userController.updateSingleUser);
exports.userRoutes = router;
