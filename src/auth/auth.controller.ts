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

    setAuthCookie(res, tokenInfo)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "New Access Token Retrived Successfully",
        data: tokenInfo
    })
})

const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User log out Successfully",
        data: null
    })
})

export const AuthControllers = {
    credentialsLogin,
    getNewAccessToken,
    logout
}