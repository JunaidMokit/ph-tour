import { NextFunction, Request, Response } from "express"

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    const statusCode = 500;
    const message = `Something went Wrong !! ${err.message} from app `

    res.status(statusCode).json({
        success: false,
        message,
        err
    })
}