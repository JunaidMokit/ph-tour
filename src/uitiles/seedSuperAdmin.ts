import { IAuthProvider, IUser, Role } from "../app/modules/user/user.interface";
import { User } from "../app/modules/user/user.model"
import bcryptjs from "bcryptjs"

export const seedSuperAdmin = async () => {
    try {

        const isSuperAdminExist = await User.findOne({ email: "superadmin@gmail.com" })
        if (isSuperAdminExist) {
            console.log("Super Admin Already exist");
            return;
        }

        const hashPassword = await bcryptjs.hash("12345678", Number(10))

        const authProvider: IAuthProvider = {
            provider: "credentials",
            providerId: "superadmin@gmail.com"
        }

        const payload: IUser = {
            name: "Super Admin",
            role: Role.SUPER_ADMIN,
            email: "superadmin@gmail.com",
            password: hashPassword,
            isVerified: true,
            auths: [authProvider]

        }

        const superadmin = await User.create(payload)
        console.log("Super Admin Creted Successfully");
        console.log(superadmin)

    } catch (error) {
        console.log(error)

    }
}