import AppError from "../errorHelpers/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"
import jwt, { JwtPayload } from "jsonwebtoken";

const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;
    const isUserExit = await User.findOne({ email })

    if (isUserExit) {
        throw new AppError(httpStatus.BAD_REQUEST, "User Already exist")
    }

    const authProvider: IAuthProvider = { provider: "credentials", providerId: email as string }

    const hashPassword = await bcryptjs.hash(password as string, Number(10))

    const user = await User.create({
        email,
        password: hashPassword,
        auths: [authProvider],
        ...rest
    })
    return user;
}


const updateUser = async (
    userId: string,
    payload: Partial<IUser>,
    decodedToken: JwtPayload
) => {
    const ifUserExist = await User.findById(userId);
    if (!ifUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User not found");
    }

    // Only SUPER_ADMIN can update anything
    if (decodedToken.role !== Role.SUPER_ADMIN) {
        throw new AppError(httpStatus.FORBIDDEN, "Only SUPER_ADMIN is authorized to update users");
    }

    // 🚫 Prevent creating a second SUPER_ADMIN
    if (payload.role === Role.SUPER_ADMIN) {
        const existingSuperAdmin = await User.findOne({ role: Role.SUPER_ADMIN });
        // If someone else is already SUPER_ADMIN and it's not this user, block it
        if (existingSuperAdmin && existingSuperAdmin._id.toString() !== userId) {
            throw new AppError(httpStatus.BAD_REQUEST, "There can only be one SUPER_ADMIN");
        }
    }

    // Hash password if updating
    if (payload.password) {
        payload.password = await bcryptjs.hash(payload.password, 10);
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(userId, payload, {
        new: true,
        runValidators: true,
    });

    return updatedUser;
};



const getAllUsers = async () => {
    const users = await User.find({});
    const totalUsers = await User.countDocuments()
    return {
        data: users,
        meta: {
            total: totalUsers
        }
    };
}




export const UserService = {
    createUser,
    getAllUsers,
    updateUser
}