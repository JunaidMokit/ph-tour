import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";

import { AnyObject } from "mongoose";
import { createUserZodSchema } from "./user.validation";

import { AnyZodObject, ZodSchema } from "zod";
import { validateRequest } from "../middleware/validateRequest";

const router = Router()



router.post("/register", validateRequest(createUserZodSchema), UserControllers.createUser);


router.get("/all-users", UserControllers.getAllUsers)

export const UserRoutes = router;
