
import { IUser } from "../app/modules/user/user.interface"
import { User } from "../app/modules/user/user.model"
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"
import AppError from "../app/modules/errorHelpers/AppError"
import jwt from "jsonwebtoken";
import { generateToken } from "../uitiles/jwt"



const credentialsLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    const isUserExit = await User.findOne({ email })

    if (!isUserExit) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email doesn't exist")
    }

    const isPasswordMatched = await bcryptjs.compare(password as string, isUserExit.password as string)

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
    }

    const jwtPayload = {
        userId: isUserExit._id,
        email: isUserExit.email,
        role: isUserExit.role
    }

    // const accessToken = jwt.sign(jwtPayload, "secret", {
    //     expiresIn: "1d"
    // })
    const accessToken = generateToken(jwtPayload, "access_secret", "1d")




    return {
        accessToken
    }

}

export const AuthService = {
    credentialsLogin
}