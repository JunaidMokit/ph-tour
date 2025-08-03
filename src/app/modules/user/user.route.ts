import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";

import { AnyObject } from "mongoose";
import { createUserZodSchema } from "./user.validation";

import { AnyZodObject, ZodSchema } from "zod";
import { validateRequest } from "../middleware/validateRequest";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelpers/AppError";
import { Role } from "./user.interface";

const router = Router()



router.post("/register", validateRequest(createUserZodSchema), UserControllers.createUser);


router.get("/all-users", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new AppError(403, "No Token Recievd")
        }

        const verifiedToken = jwt.verify(accessToken, "access_secret")

        if (!verifiedToken) {
            throw new AppError(403, `You are not authorized ${verifiedToken}`)
        }

        if ((verifiedToken as JwtPayload).role !== Role.ADMIN) {
            throw new AppError(403, "You are not Permited to view this route")
        }


        // next()
        return UserControllers.getAllUsers(req, res, next);

    } catch (error) {
        next(error)

    }

}, UserControllers.getAllUsers)

export const UserRoutes = router;
