import { Router } from "express";
import { crudRoutes } from "../modules/crud/crud.route";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/crud',
        route: crudRoutes,
    },
    {
        path: '/user',
        route: userRoutes,
    },
    {
        path: '/auth',
        route: authRoutes,
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;