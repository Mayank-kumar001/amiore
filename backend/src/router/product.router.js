import express from "express"
import { createProduct, deleteProduct, getAllProduct, getProductByCategoryId, getProductByGender, getProductById, getProductByParentId, updateProduct } from "../controllers/product.controller.js";

export const productRouter = express.Router();

productRouter.post("/create-product", createProduct);
productRouter.post("/update-product", updateProduct);
productRouter.delete("/delete-product/:productId", deleteProduct);
productRouter.get("/get-all-product", getAllProduct);
productRouter.get("/get-productById/:productId", getProductById);
productRouter.get("/get-productByParentId/:parentId", getProductByParentId);
productRouter.get("/get-productByCategoryId/:categoryId", getProductByCategoryId);
productRouter.get("/get-productByGender/:gender", getProductByGender);
