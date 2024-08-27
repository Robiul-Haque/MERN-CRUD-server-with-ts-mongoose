import { Router } from "express";
import { crudRoutes } from "../modules/crud/crud.route";
import { userRoutes } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/crud',
        route: crudRoutes,
    },
    {
        path: '/user',
        route: userRoutes,
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;