import { createCategorySchema } from "../validators/category.validator.js";
import apiError from "../utils/apiError.utils.js";
import apiResponse from "../utils/apiResponse.utils.js";
import { db } from "../utils/db.utils.js";
import { includes } from "zod";

export const createCategory = async (req, res) => {
    try {
        const schemaCheck = createCategorySchema.safeParse(req.body);
    
        if(!schemaCheck.success){
            throw new apiError(400, schemaCheck.error.issues[0].message);
        }
        const {name, description, gender} = req.body
        const category = await db.Category.create({
            data:{
                name,
                description,
                gender
            }
        })
        res.status(200).json(new apiResponse(200, category, "Category created successfully"));
    } catch (error) {
        console.log(error.message);
        if (error instanceof apiError) {
            return res.status(error.statusCode).json({
                statusCode: error.statusCode,
                message: error.message,
                success: false,
            });
        }
        return res.status(500).json({
            statusCode: 500,
            message: "Something went wrong while creating the category",
            success: false,
        });
    }
}
export const deleteCategory = async (req, res) => {
    try {

        const category = await db.category.findUnique({
            where:{
                id: req.params.categoryId
            },
            include:{
                products: true
            }
        })

        if(category.products.length > 0){
            throw new apiError(400, "Category has products associated with it");
        }

        

        await db.Category.delete({
            where: {
                id: req.params.categoryId
            }
        })

        res.status(200).json(new apiResponse(200, {}, "Category deleted successfully"))
    } catch (error) {
        console.log(error.message);
        if (error instanceof apiError) {
            return res.status(error.statusCode).json({
                statusCode: error.statusCode,
                message: error.message,
                success: false,
            });
        }
        return res.status(500).json({
            statusCode: 500,
            message: "Something went wrong while deleting the category",
            success: false,
        });
    }
}
export const getAllCategory = async (req, res) => {
    try {
        const categories = await db.Category.findMany();
        res.status(200).json(new apiResponse(200, categories, "Categories fetched successfully")); 
    } catch (error) {
        console.log(error.message);
        if (error instanceof apiError) {
            return res.status(error.statusCode).json({
                statusCode: error.statusCode,
                message: error.message,
                success: false,
            });
        }
        return res.status(500).json({
            statusCode: 500,
            message: "Something went wrong while fetching the categories",
            success: false,
        });
    }
}
