import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization", "Accept"],
        exposedHeaders: ["Set-Cookie", "*"],
    }),
);
app.use(cookieParser())
app.use(express.json())

console.log("portooo", process.env.PORT)
const port = process.env.PORT ?? 8080;

app.get("/", (req, res) => {
    res.send("hello world");
});


// Importing Routes

import { authRouter } from "./router/auth.router.js";
import { productRouter } from "./router/product.router.js";
import { categoryRouter } from "./router/category.router.js";
import { cartRouter } from "./router/cart.router.js";
import { payementRouter } from "./router/payment.router.js";

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/product", productRouter)
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/cart", cartRouter)
app.use("/api/v1/payments", payementRouter)



app.listen(port, () => {
  console.log(`listening on http://localhost:${port}/`);
});
