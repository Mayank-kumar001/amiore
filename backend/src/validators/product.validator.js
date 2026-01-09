import { boolean, string, z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(1, "This field is required"),
    description: z.string().optional(),
    price: z.number(),
    mainImage: z.string(),
    subImage: z.array(z.string().min(1, "Empty strings are not allowed")).min(1, "At least one subImage is required"),
    colour: z.string(),
    type: z.string(),
    categoryId: z.string().min(1, "This field is required"),
    stocks: z.array(
        z.object({
            size: z.string().min(1, "Size is required"),
            quantity: z.number().min(0, "Quantity must be at least 0"),
        })
    ).min(1, "At least one stock is required"), // example [{size: "S", quantity: 0},{size: "M", quantity: 0},{size: "L", quantity: 0},]

});

