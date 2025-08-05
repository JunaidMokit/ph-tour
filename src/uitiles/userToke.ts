import { JwtPayload } from "jsonwebtoken";
import { IsActive, IUser } from "../app/modules/user/user.interface";
import { generateToken, verifyToken } from "./jwt";
import { User } from "../app/modules/user/user.model";
import AppError from "../app/modules/errorHelpers/AppError";
import httpStatus from "http-status-codes"

export const createUserTokens = (user: Partial<IUser>) => {
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role
    }
    const accessToken = generateToken(jwtPayload, "access_secret", "15s")
    const refreshToken = generateToken(jwtPayload, "jwt_refresh_secret", "30d")

    return {
        accessToken,
        refreshToken
    }
}

export const createNewAccessTokenWithRefreshToken = async (refreshToken: string) => {
    const verifiedRefreshToken = verifyToken(refreshToken, "jwt_refresh_secret" as string) as JwtPayload

    const isUserExit = await User.findOne({ email: verifiedRefreshToken.email })

    if (!isUserExit) {
        throw new AppError(httpStatus.BAD_REQUEST, "User doesn't exist")
    }
    if (isUserExit.isActive === IsActive.BLOCKED || isUserExit.isActive === IsActive.INACTIVE) {
        throw new AppError(httpStatus.BAD_REQUEST, "User IS Blocked or INactive")
    }

    if (isUserExit.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is Deleted")
    }

    const jwtPayload = {
        userId: isUserExit._id,
        email: isUserExit.email,
        role: isUserExit.role
    }
    const accessToken = generateToken(jwtPayload, "access_secret", "30d")




    const userTokens = createUserTokens(isUserExit)

    delete isUserExit.password;

    const { password: pass, ...rest } = isUserExit.toObject();


    return accessToken



}