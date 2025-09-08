import express from "express";
import { createCategory, deleteCategory, getAllCategory } from "../controllers/category.controller.js";

export const categoryRouter = express.Router();

categoryRouter.post("/create-category", createCategory);
categoryRouter.delete("/delete-category/:categoryId", deleteCategory);
categoryRouter.get("/get-all-category", getAllCategory);

