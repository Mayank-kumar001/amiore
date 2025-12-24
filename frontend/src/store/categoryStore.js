import { create } from 'zustand'
import { axiosInstance } from '../utils/axiosInstance';
import toast from "react-hot-toast"

export const CategoryStore = create((set) => ({
    categories: [],
    fetchingCategories: false,
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
    }
}));
