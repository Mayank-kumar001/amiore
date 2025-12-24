import Razorpay from "razorpay"
import { db } from "../utils/db.utils.js";
import "dotenv/config"
import crypto from "crypto"
import { userInfo } from "os";
import apiError from "../utils/apiError.utils.js"
import apiResponse from "../utils/apiResponse.utils.js"


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, 
    key_secret: process.env.RAZORPAY_KEY_SECRET, 
});

export const createOrder = async (req, res) => {
    try {
        const { amount, currency = "INR", items = [], userDetails, cod } = req.body;
        // console.log(req.body)
        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: "order_rcptid_11",
        };
        const razorpayOrder = await razorpay.orders.create(options);
        let order;
        if(!cod){
            order = await db.Order.create({
            data: {
                userId: req.user.id,
                amount: options.amount,
                currency,
                userInfo: userDetails,
                status: "PENDING",
                lineItems: items,
                razorpayOrderId: razorpayOrder.id,
            }
        })
        }else{
            order = await db.Order.create({
                data: {
                    userId: req.user.id,
                    amount: options.amount,
                    currency,
                    userInfo: userDetails,
                    status: "COD",
                    lineItems: items,
                }
            })
        }
        res.json({ id:order.id, razorpayOrder });


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
            message: "Something went wrong while creating the order",
            success: false,
        });
    }
}

export const MarkOrderDelivered = async(req,res) => {
    try {
        const {orderId} = req.body;
        await db.Order.update({
            where:{
                id:orderId
            },
            data:{
                delivered: true
            }
        })
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
            message: "Something went wrong while marking order delivered",
            success: false,
        });
    }
}

export const getOrderDetails = async(req,res) => {
    try {
        
        const {orderId} = req.query;
        const order = await db.Order.findUnique({
            where:{
                id:orderId
            }
        })

        res.status(200).json(new apiResponse(200, {
            id: order.id,
            amount: order.amount,
            date: order.createdAt,
            userDetails: order.userInfo 
        }), "Order fetched successfully")
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
            message: "Something went wrong while fetching order",
            success: false,
        });
    }
}

export const verifyPayment = async (req, res) => {
    try {
        console.log("hello jii");
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        console.log(req.body);

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        
            console.log("hello heeeloooooo1");
        console.log(generatedSignature);
        console.log("hello heeeloooooo");

        if (generatedSignature === razorpay_signature) {
            console.log("sahi hai")
            
            await db.Order.update({
                where:{
                    razorpayOrderId: razorpay_order_id
                },
                data:{
                    status: "PAID",
                    razorpayPaymentId:razorpay_payment_id,
                    razorpaySignature:razorpay_signature
                }
            })
            return res.status(200).json({ valid: true });
        }
        console.log("galat hai")
        await db.Order.update({
                where:{
                    razorpayOrderId: razorpay_order_id
                },
                data:{
                    status: "FAILED",
                    razorpayPaymentId:razorpay_payment_id,
                    razorpaySignature:razorpay_signature
                }
            })
        return res.status(400).json({ valid: false });

    } catch (error) {
        console.log(error)
    }
}

// export const getAllPendingOrders = async (req, res) => {
//     try {
//         const orders = await db.Order.findMany({
//             where:{
//                 delivered: false
//             }
//         })
//         res.status(200).json(new apiResponse(200, orders, "Orders fetched successfully"))
//     } catch (error) {
//         console.log(error.message);
//         if (error instanceof apiError) {
//             return res.status(error.statusCode).json({
//                 statusCode: error.statusCode,
//                 message: error.message,
//                 success: false,
//             });
//         }
//         return res.status(500).json({
//             statusCode: 500,
//             message: "Something went wrong while fetching orders",
//             success: false,
//         });
//     }
// }