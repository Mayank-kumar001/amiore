import { includes } from "zod";
import apiError from "../utils/apiError.utils.js";
import apiResponse from "../utils/apiResponse.utils.js";
import { db } from "../utils/db.utils.js"

export const addToCart = async (req, res) => {
    try {
        const { productId, inventoryId } = req.query;
        // console.log({ productId, inventoryId })

        if (!productId || !inventoryId) {
            throw new apiError(400, "Product id and inventory id is required");
        }

        const cartItem = await db.Cart.upsert({
            where: {
                userId_inventoryId: {
                    inventoryId, 
                    userId: req.user.id
                }
            },
            update: {
                quantity: {
                    increment: 1
                }
            },
            create: {
                productId,
                inventoryId,
                userId: req.user.id,
                quantity: 1,
            }
        })

        res.status(200).json(new apiResponse(200, {}, "Product added to cart"))
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
            message: "Something went wrong while adding to cart",
            success: false,
        });

    }

}

export const incrementQuantity = async (req, res) => {
    try {
        const { inventoryId } = req.params;



        let cartItem = await db.Cart.findUnique({
            where: {
                userId_inventoryId: {
                    inventoryId,
                    userId: req.user.id
                }
            }
        })

        if (!cartItem) {
            throw new apiError(404, "Product not found in cart");
        }



        cartItem = await db.Cart.update({
            where: {
                userId_inventoryId: {
                    inventoryId,
                    userId: req.user.id
                }
            },
            data: {
                quantity: {
                    increment: 1
                }
            }
        })
        res.status(200).json(new apiResponse(200, {}, "Product quantity updated"))
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
            message: "Something went wrong while incrementing from cart",
            success: false,
        });
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const { inventoryId } = req.params;
        await db.Cart.delete({
            where: {
                userId_inventoryId: {
                    inventoryId,
                    userId: req.user.id
                }
            }
        })

        res.status(200).json(new apiResponse(200, {}, "Product removed from cart"))
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
            message: "Something went wrong while removing from cart",
            success: false,
        });
    }
}

export const decrementQuantity = async (req, res) => {
    try {
        const { inventoryId } = req.params;
        console.log(inventoryId)



        let cartItem = await db.Cart.findUnique({
            where: {
                userId_inventoryId: {
                    inventoryId,
                    userId: req.user.id
                }
            }
        })

        if (!cartItem) {
            throw new apiError(404, "Product not found in cart");
        }

        if (cartItem.quantity <= 1) {
            await db.Cart.delete({
                where: {
                    userId_inventoryId: {
                        inventoryId,
                        userId: req.user.id
                    }
                }
            })
            return res.status(200).json(new apiResponse(200, {}, "Product removed from cart"))
        }


        cartItem = await db.Cart.update({
            where: {
                userId_inventoryId: {
                    inventoryId,
                    userId: req.user.id
                }
            },
            data: {
                quantity: {
                    decrement: 1
                }
            }
        })
        res.status(200).json(new apiResponse(200, {}, "Product quantity updated"))
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
            message: "Something went wrong while removing from cart",
            success: false,
        });
    }
}

export const getAllCartItems = async (req, res) => {
    try {
        const cartItems = await db.Cart.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                product: true,
                inventory: true
            }
        })
        res.status(200).json(new apiResponse(200, cartItems, "Cart items fetched successfully"))
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
            message: "Something went wrong while fetching cart items",
            success: false,
        });
    }
}