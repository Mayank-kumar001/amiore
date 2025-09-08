import Razorpay from "razorpay"
import { db } from "../utils/db.utils.js";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
    try {
        const { amount, currency = "INR", items = [] } = req.body;
        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: "order_rcptid_11",
        };
        const order = await razorpay.orders.create(options);

        await db.Order.create({
            date: {
                userId: req.user.id,
                amount: options.amount,
                currency,
                status: "PENDING",
                lineItems: items,
                razorpayOrderId: order.id,
            }
        })
        res.json({ order });


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

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generatedSignature === razorpay_signature) {
            return res.status(200).json({ valid: true });
        }
        return res.status(400).json({ valid: false });

    } catch (error) {

    }
}