import express from "express";
import { addToCart, decrementQuantity, getAllCartItems, incrementQuantity, removeFromCart } from "../controllers/cart.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

export const cartRouter = express.Router();

cartRouter.get("/add-to-cart/", isLoggedIn, addToCart);
cartRouter.get("/increment-quantity/:inventoryId", isLoggedIn, incrementQuantity);
cartRouter.get("/decrement-quantity/:inventoryId", isLoggedIn, decrementQuantity);
cartRouter.delete("/remove-from-cart/:inventoryId", isLoggedIn, removeFromCart);
cartRouter.get("/get-all-cartItems",isLoggedIn, getAllCartItems);