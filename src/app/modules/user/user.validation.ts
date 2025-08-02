import z from "zod"
export const createUserZodSchema = z.object({
    name: z.string({
        invalid_type_error: "Name must be a string"
    })
        .min(2, { message: "Name too short. Minimum 2 characters." })
        .max(50, { message: "Name too long. Maximum 50 characters." }),

    email: z.string().email({ message: "Invalid email address" }),

    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[@$!%*?&#^()_\-+=]/, "Password must contain at least one special character")
        .optional(),

    phone: z
        .string()
        .regex(/^01[3-9]\d{8}$/, {
            message: "Phone number must be a valid Bangladeshi number (e.g. 01XXXXXXXXX)"
        })
        .optional(),

    address: z.string().optional()
});

export const updateUserZodSchema = z.object({
    name: z.string({
        invalid_type_error: "Name must be a string"
    })
        .min(2, { message: "Name too short. Minimum 2 characters." })
        .max(50, { message: "Name too long. Maximum 50 characters." }).optional(),



    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[@$!%*?&#^()_\-+=]/, "Password must contain at least one special character")
        .optional(),

    phone: z
        .string()
        .regex(/^01[3-9]\d{8}$/, {
            message: "Phone number must be a valid Bangladeshi number (e.g. 01XXXXXXXXX)"
        })
        .optional(),

    address: z.string().optional(),

    role: Role;
    isDeleted?: string;
    isActive?: IsActive;
    isVerified?: string;

});