import { create } from 'zustand'
import { axiosInstance } from '../utils/axiosInstance';
import toast from "react-hot-toast"

export const CategoryStore = create((set) => ({
    categories: [],
    dividedCategories: null,
    fetchingCategories: false,
    categoryUpadted: false,
    getAllCategories: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get("/category/get-all-category");
            console.log("hello jiiii")
            set({ categories: res.data.data });
        } catch (error) {
            toast.error("Failed to fetch categories");
        } finally {
            set({ loading: false });
        }
    },
    getDividedCategories: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get("/category/get-divided-category");
            set({ dividedCategories: res.data.data });
        } catch (error) {
            toast.error("Failed to fetch categories");
        } finally {
            set({ loading: false });
        }
    },
    createCategory: async (data) => {
        set({ loading: true });
        try {
            // console.log("yehh dekho", data)
            const res = await axiosInstance.post("/category/create-category", data);
            toast.success("Category created successfully");
            set({ categoryUpadted: !categoryUpadted });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ loading: false });
        }
    }
}));
