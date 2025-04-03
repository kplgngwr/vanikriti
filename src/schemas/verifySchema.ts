import { z } from "zod";

export const verifySchema = z.object({
    verifyCode:z.string().length(6, "Verification Code must be atleast 6 characters long")
})