import express from "express"
import { createOrder } from "../controllers/payment.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

export const payementRouter = express.Router();

payementRouter.post("/create-order",isLoggedIn, createOrder);
payementRouter.post("/payments/verify",isLoggedIn, verifyPayment);