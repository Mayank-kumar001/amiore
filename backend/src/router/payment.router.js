import express from "express"
import { createOrder, getOrderDetails, verifyPayment, getAllPendingOrders, updateOrderStatus } from "../controllers/payment.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

export const payementRouter = express.Router();

payementRouter.post("/create-order",isLoggedIn, createOrder);
payementRouter.post("/verify",isLoggedIn, verifyPayment);
payementRouter.get("/orderSuccessful",isLoggedIn, getOrderDetails);
payementRouter.get("/pending-orders", isLoggedIn, getAllPendingOrders);
payementRouter.patch("/update-order-status", isLoggedIn, updateOrderStatus);