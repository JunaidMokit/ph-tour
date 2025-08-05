
import { IsActive, IUser } from "../app/modules/user/user.interface"
import { User } from "../app/modules/user/user.model"
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"
import AppError from "../app/modules/errorHelpers/AppError"
import jwt, { JwtPayload } from "jsonwebtoken";
import { generateToken, verifyToken } from "../uitiles/jwt"
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../uitiles/userToke"



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

    const userTokens = createUserTokens(isUserExit)

    delete isUserExit.password;

    const { password: pass, ...rest } = isUserExit.toObject();


    return {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: rest
    }

}

const getNewAccessToken = async (refreshToken: string) => {

    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)
    return { accessToken: newAccessToken }

}

export const AuthService = {
    credentialsLogin,
    getNewAccessToken
}