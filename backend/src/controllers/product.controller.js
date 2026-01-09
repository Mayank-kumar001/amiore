import apiError from "../utils/apiError.utils.js";
import apiResponse from "../utils/apiResponse.utils.js";
import { db } from "../utils/db.utils.js";
import { createProductSchema } from "../validators/product.validator.js";

export const createProduct = async (req, res) => {
    try {
        const schemaCheck = createProductSchema.safeParse(req.body);
        if (!schemaCheck.success) {
            throw new apiError(400, schemaCheck.error.issues[0].message);
        }
        const {
            name,
            description,
            price,
            mainImage,
            subImage,
            colour,
            type,
            categoryId,
            stocks,
        } = req.body;
        const product = await db.Product.create({
            data: {
                name,
                description,
                price,
                mainImage,
                subImage,
                colour,
                type,
                categoryId,
                inventory: {
                    create: stocks,
                },
            },
        });

        res.status(200).json(
            new apiResponse(
                201,
                {
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    colour: product.colour,
                    type: product.type,
                    categoryId: product.categoryId,
                },
                "Product created successfully",
            ),
        );
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
            message: "Something went wrong while creating the product",
            success: false,
        });
    }
};
export const updateProduct = async (req, res) => {
    try {
        const schemaCheck = createProductSchema.safeParse(req.body);
        if (!schemaCheck.success) {
            throw new apiError(400, schemaCheck.error.issues[0].message);
        }
        const {
            name,
            description,
            price,
            mainImage,
            subImage,
            isAvailable,
            discount,
            categoryId,
            stocks,
        } = req.body;
        const product = await db.Product.update({
            where: {
                name,
            },
            data: {
                name,
                description,
                price,
                mainImage,
                subImage,
                isAvailable,
                discount,
                categoryId,
                inventory: {
                    create: stocks,
                },
            },
        });

        res.status(200).json(
            new apiResponse(
                201,
                {
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    isAvailable: product.isAvailable,
                    discount: product.discount,
                    categoryId: product.categoryId,
                },
                "Product updated successfully",
            ),
        );
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
            message: "Something went wrong while updating the product",
            success: false,
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await db.Product.delete({
            where: {
                id: req.params.productId
            }
        })

        res.status(200).json(new apiResponse(200, {}, "Product deleted successfully"))
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
            message: "Something went wrong while updating the product",
            success: false,
        });
    }
};

export const getAllProduct = async (req, res) => {
    try {
        const allProducts = await db.Product.findMany({
            include: {
                inventory: true,
                category: true
            }
        })
        res.status(200).json(new apiResponse(200, allProducts, "All products fetched successfully"))
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
            message: "Something went wrong while fetching the products",
            success: false,
        });
    }
};
export const getProductById = async (req, res) => {
    try {
        const product = await db.Product.findUnique({
            where: {
                id: req.params.productId
            },
            include: {
                inventory: true,
                category: true
            }
        })
        res.status(200).json(new apiResponse(200, product, "Product fetched successfully"))
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
            message: "Something went wrong while fetching the product",
            success: false,
        });
    }
};
export const getProductByParentId = async (req, res) => {
  try {
    const parentId = req.params.parentId;

    // STEP 1: all children of given parent
    const childCategories = await db.category.findMany({
      where: { parentId },
      select: { id: true },
    });
    console.log(childCategories)

    // If no children → return empty
    if (childCategories.length === 0) {
      return res.status(200).json(
        new apiResponse(200, [], "No child categories or products found")
      );
    }

    // STEP 2: fetch all products for those child categories
    const products = await db.product.findMany({
      where: { 
        categoryId: { in: childCategories.map(c => c.id) } 
      },
      include: { category: true },
    });

    return res.status(200).json(
      new apiResponse(200, products, "Products fetched successfully")
    );

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Something went wrong while fetching the products",
      success: false,
    });
  }
};
export const getProductByCategoryId = async (req, res) => {
    try {
        const products = await db.Product.findMany({
            where: {
                categoryId: req.params.categoryId
            },
            include: {
                inventory: true,
                category: true
            }
        })
        res.status(200).json(new apiResponse(200, products, "Products fetched successfully"))
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
            message: "Something went wrong while fetching the products",
            success: false,
        });
    }
};

export const getProductByGender = async (req, res) => {
    try {
        const products = await db.product.findMany({
            where: {
                category: {
                    gender: req.params.gender,
                },
            },
            include: {
                category: true,
                inventory: true
            },
        });
        res.status(200).json(new apiResponse(200, products, "Products fetched successfully"));
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
            message: "Something went wrong while fetching the products",
            success: false,
        });
    }
}
