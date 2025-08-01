import { NextFunction, Request, Response } from "express";
import { User } from "./user.model";
import httpStatus from "http-status-codes"
import { UserService } from "./user.service";
import { catchAsync } from "../../../uitiles/catchAsync";
import { sendResponse } from "../../../uitiles/sendResponse";


// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {

//         const user = await UserService.createUser(req.body);

//         res.status(httpStatus.CREATED).json({
//             message: "User created Successfully",
//             user
//         })
//     } catch (error: any) {
//         console.log(error);
//         next(error)

//     }
// }

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.createUser(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
        data: user
    })
})

const getAllUsers = (async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.getAllUsers();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All Users retrived Successfully",
        data: result.data,
        meta: result.meta
    })

})


export const UserControllers = {
    createUser,
    getAllUsers
}