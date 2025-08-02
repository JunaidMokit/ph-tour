
import { IUser } from "../app/modules/user/user.interface"
import { User } from "../app/modules/user/user.model"
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"
import AppError from "../app/modules/errorHelpers/AppError"

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

    return {
        email: isUserExit.email
    }

}

export const AuthService = {
    credentialsLogin
}