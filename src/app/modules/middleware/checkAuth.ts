import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import AppError from "../errorHelpers/AppError";

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new AppError(403, "No Token Recievd")
        }

        const verifiedToken = jwt.verify(accessToken, "access_secret") as JwtPayload

        if (!verifiedToken) {
            throw new AppError(403, `You are not authorized ${verifiedToken}`)
        }

        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "You are not Permited to view this route")
        }



        // return UserControllers.getAllUsers(req, res, next);
        next()

    } catch (error) {
        next(error)

    }

}
