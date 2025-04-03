import { z } from "zod";

export const plantSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be atleast 3 charcters long")
        .max(30, "Name must be atmost 30 charcters long"),
    description: z
        .string()
        .min(10, "Description must be atleast 10 charcters long")
        .max(350, "Description must bet atmost 350 charcters long"),
    price: z
        .number({ message: "Price must be in numbers" })
        .lt(1, "Price can not be lower than 1")
        .gt(10000, "price can not be greater than 10000"),
    category: z
        .string()
        .min(3, "Category must be atleast 3 charcters long")
        .max(30, "Category must be atmost 30 charcters long"),
    plantImages: z
        .string()

    // TODO : Add user and caring here
})