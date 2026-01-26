import React from 'react'
import { motion } from "motion/react";
import { Loader2, X } from "lucide-react";
import toast from "react-hot-toast";
import { cartStore } from "../store/cartStore";
import { authStore } from "../store/authStore";

function ProductDetailComponent({ setSideModalOpen, data }) {
   return (
    <div className="fixed z-20 inset-0 flex h-full w-full items-center justify-center bg-black/50">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
          filter: `blur(4px)`,
          width: 0,
          height: "100vh",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: `blur(0px)`,
          width: window.innerWidth < 768 ? "100%" : "50%",
        }}
        exit={{
          opacity: 0,
          scale: 0.8,
          filter: `blur(4px)`,
          width: 0,
          height: "100vh",
        }}
        className="absolute overflow-y-auto right-0 min-h-screen bg-white px-6 sm:px-8 md:px-10 py-8 sm:py-10 flex flex-col "
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-semibold text-gray-800">
            Product Details
          </div>
          <X
            className="cursor-pointer hover:rotate-90 transition-transform duration-300"
            onClick={() => setSideModalOpen(false)}
            size={24}
          />
        </div>

        {/* Product Info */}
        <div className='text-sm'>{data}</div>

      </motion.div>
    </div>
  );
}

export default ProductDetailComponent