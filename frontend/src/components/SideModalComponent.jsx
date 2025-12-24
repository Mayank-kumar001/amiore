import React, { useState } from "react";
import { motion } from "motion/react";
import { Loader2, X } from "lucide-react";
import toast from "react-hot-toast";
import { cartStore } from "../store/cartStore";
import { authStore } from "../store/authStore";

function SideModalComponent({ setSideModalOpen, product }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const { addProduct, isLoading, setCartModalOpen } = cartStore();
  const { authState, setAuthModalOpen } = authStore();

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
        className="absolute overflow-y-auto right-0 min-h-screen bg-white px-6 sm:px-8 md:px-10 py-8 sm:py-10 flex flex-col justify-between"
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
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
          <div className="flex-shrink-0">
            <img
              src={product.mainImage}
              alt={product.name}
              className="w-[180px] sm:w-[220px] md:w-[250px] h-auto rounded-md object-cover shadow-sm"
            />
          </div>
          <div className="flex flex-col justify-between gap-3 sm:gap-4">
            <div className="font-bold text-lg sm:text-xl">{product.name}</div>
            <div className="text-gray-700 text-base sm:text-lg">
              ₹{product.price}
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div className="mt-10 sm:mt-4">
          <div className="font-medium mb-3 text-gray-800 text-base sm:text-lg">
            Select a size
          </div>
          <ul className="flex flex-wrap gap-2 sm:gap-3">
            {product.inventory.map((elem) => (
              <li
                key={elem.id}
                onClick={() => setSelectedSize(elem.id)}
                className={`py-2 px-4 rounded-md cursor-pointer text-sm sm:text-base border transition-all duration-200 ${
                  selectedSize === elem.id
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-gray-800"
                }`}
              >
                {elem.size}
              </li>
            ))}
          </ul>
        </div>

        {/* Button */}
        <div className="mt-10 sm:mt-4">
          <button
            className="bg-black text-white font-medium w-full py-3 sm:py-4 rounded-md flex justify-center cursor-pointer items-center text-sm sm:text-base hover:bg-neutral-800 transition-colors"
            onClick={async () => {
              if (!selectedSize) {
                toast.error("Select a size");
              } else if (authState !== "authenticated") {
                await setAuthModalOpen(true);
              } else {
                try {
                  const data = {
                    productId: product.id,
                    inventoryId: selectedSize,
                  };
                  await addProduct(data);
                  setSideModalOpen(false);
                  await setCartModalOpen(true);
                } catch (error) {
                  toast.error("Failed to add product to cart");
                }
              }
            }}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Add to cart"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default SideModalComponent;
