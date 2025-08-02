import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../uitiles/catchAsync"
import httpStatus from "http-status-codes"
import { sendResponse } from "../uitiles/sendResponse"
import { AuthService } from "./auth.service"

const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const loginInfo = await AuthService.credentialsLogin(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Login Successfully",
        data: loginInfo
    })
})

export const AuthControllers = {
    credentialsLogin
}