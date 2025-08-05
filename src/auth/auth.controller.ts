import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../uitiles/catchAsync"
import httpStatus from "http-status-codes"
import { sendResponse } from "../uitiles/sendResponse"
import { AuthService } from "./auth.service"
import { setAuthCookie } from "../uitiles/setCookie"

const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const loginInfo = await AuthService.credentialsLogin(req.body)

    setAuthCookie(res, loginInfo)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Login Successfully",
        data: loginInfo
    })
})

const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken
    const tokenInfo = await AuthService.getNewAccessToken(refreshToken as string)

    res.cookie("accessToken", tokenInfo.accessToken, {
        httpOnly: true,
        secure: false
    })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Login Successfully",
        data: tokenInfo
    })
})

export const AuthControllers = {
    credentialsLogin,
    getNewAccessToken
}