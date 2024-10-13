"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notFound_1 = __importDefault(require("./middleware/notFound"));
const globalErrorHandler_1 = __importDefault(require("./middleware/globalErrorHandler"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: 'http://localhost:5173', credentials: true }));
app.use((0, cookie_parser_1.default)());
app.use("/image", express_1.default.static("./public/uploads"));
app.use('/api/v1', router_1.default);
app.get('/', (req, res) => {
    res.send('Express CRUD App');
});
// route not found
app.use('*', notFound_1.default);
// global error handler
app.use(globalErrorHandler_1.default);
exports.default = app;
