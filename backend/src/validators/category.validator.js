import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.string().min(1, "This field is required"),
    description: z.string().optional(),
    gender: z.string().min(1, "This field is required"),
    parentId: z.string().min(1, "This field is required").nullable(),

})