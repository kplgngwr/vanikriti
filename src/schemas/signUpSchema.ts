import { z } from 'zod'

export const usernameValidation = z
    .string()
    .min(3, "Username must be atleast 3 characters long")
    .max(16, "Username nust be atmost 16 characters long")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not conatin special charcters")

export const signUpSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be atleast 3 charcters long")
        .max(30, "Name must be atmost 30 charcters long"),
    username: usernameValidation,
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .max(30, "Email must be atmost 30 charcters long"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(30, "Password must be at most 30 characters long")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()<,>.?/"':;{}|\\\[\]-_=+])[A-Za-z\d~!@#$%^&*()<,>.?/"':;{}|\\\[\]-_=+]{8,}$/, "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character")
})