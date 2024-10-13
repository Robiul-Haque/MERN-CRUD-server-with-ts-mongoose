"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crud_route_1 = require("../modules/crud/crud.route");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/crud',
        route: crud_route_1.crudRoutes,
    },
    {
        path: '/user',
        route: user_route_1.userRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.authRoutes,
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
