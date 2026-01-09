import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.string().min(1, "This field is required"),
    description: z.string().optional(),
    parentId: z.string().min(1, "This field is required").nullable(),

})