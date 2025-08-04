import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";

import { AnyObject } from "mongoose";
import { createUserZodSchema } from "./user.validation";

import { AnyZodObject, ZodSchema } from "zod";
import { validateRequest } from "../middleware/validateRequest";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelpers/AppError";
import { Role } from "./user.interface";
import { checkAuth } from "../middleware/checkAuth";

const router = Router()


router.post("/register", validateRequest(createUserZodSchema), UserControllers.createUser);


// router.get("/all-users", checkAuth("ADMIN", "SUPER_ADMIN"), UserControllers.getAllUsers)
router.get("/all-users", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), UserControllers.getAllUsers);


export const UserRoutes = router;
