import React, { useEffect, useState } from 'react'
import { useRef } from "react";
import { ChevronLeft, ChevronRight, MoveLeftIcon, MoveRightIcon, Plus } from "lucide-react";
import { productStore } from '../store/productStore';
import SideModalComponent from './SideModalComponent';



// export const suggestedProducts = [
//   {
//     id: 1,
//     title: "Ink Stripe Shirt White Navy",
//     image: "https://ik.imagekit.io/mayank01/s01_iNUpnBQU1.webp",
//     price: 99,
//     originalPrice: 239,
//     sale: true,
//   },
//   {
//     id: 2,
//     title: "Mercerised Crew Neck T-Shirt Black",
//     image: "/images/black-tee.png",
//     price: 119,
//   },
//   {
//     id: 3,
//     title: "Stripe Zip Through Shirt Navy",
//     image: "/images/zip-shirt.png",
//     price: 99,
//     originalPrice: 279,
//     sale: true,
//   },
//   {
//     id: 4,
//     title: "Mercerised Crew Neck T-Shirt White",
//     image: "/images/white-tee.png",
//     price: 119,
//   },
// ]


function SuggestedForYouComponent({setCartModalOpen}) {
    const [scrollProgress, setScrollProgress] = useState(0.1);
    
    // const [selectedProduct, setSelectedProduct] = useState([]);

    const { getProductsByParentId, allProducts, setSideModalOpen, selectedProduct, setSelectedProduct } = productStore();
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
   
    useEffect(() => {
        const fetchSuggestedProducts = async () => {
            try {
                const products = await getProductsByParentId("d949df63-b1cc-4e5e-94c1-8e0961ed3c75")

            } catch (error) {
                console.log(error)
            }
        }
        fetchSuggestedProducts()
    }, [getProductsByParentId])
    const sliderRef = useRef(null);

    const scroll = (direction) => {
        const { current } = sliderRef;
        console.log(sliderRef)
        if (!current) return;

        const scrollAmount = 320;
        current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };
    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const handleScroll = () => {
            const maxScroll = slider.scrollWidth - slider.clientWidth;
            const progress = maxScroll > 0 ? slider.scrollLeft / maxScroll : 0;
            setScrollProgress(progress);
        };

        slider.addEventListener("scroll", handleScroll);
        return () => slider.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="relative w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-medium">
                    SUGGESTED FOR YOU
                </h2>

                <div className="flex">
                    <button
                        onClick={() => scroll("left")}
                        className="p-2 transition cursor-pointer"
                    >
                        <MoveLeftIcon size={12} />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="p-2  transition cursor-pointer"
                    >

                        <MoveRightIcon size={12} />
                    </button>
                </div>
            </div>

            {/* Carousel */}
            <div
                ref={sliderRef}
                // onMouseDown={onMouseDown}
                // onMouseLeave={onMouseLeave}
                // onMouseUp={onMouseUp}
                // onMouseMove={onMouseMove}
                className="flex gap-6 overflow-x-scroll scrollbar-hide scroll-smooth"
            >
                {allProducts.map((product) => (
                    <div
                        key={product.id}
                        className="min-w-[200px] bg-white group"
                    >
                        {/* Image */}
                        <div className="relative bg-gray-100">
                            {/* {product.sale && (
                                <span className="absolute top-3 left-3 text-xs font-semibold">
                                    SALE
                                </span>
                            )} */}

                            <img
                                src={product.mainImage}
                                alt={product.name}
                                className="w-[200px] h-[240px] object-contain aspect-square"
                            />

                            {/* Add Button */}
                            <button className="absolute bottom-4 right-4 p-2 transition cursor-pointer">
                                <Plus size={16} onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedProduct(product)
                                    setCartModalOpen(false)
                                    setSideModalOpen(true)
                                }} />
                            </button>
                        </div>
                        

                        {/* Details */}
                        <div className="mt-3 text-sm">
                            <p className="font-medium">{product.name}</p>

                            <div className="flex gap-2 mt-1">
                                {/* {product.price && (
                                    <span className="line-through text-gray-400">
                                        ${product.price}.00
                                    </span>
                                )} */}
                                <span className="font-semibold">
                                    ${product.price}.00
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 h-[2px] w-full bg-gray-200 overflow-hidden">
                <div
                    className="absolute bottom-0 left-0 h-[2px] bg-black transition-all"
                    style={{ width: `${scrollProgress * 100}%` }}
                />
            </div>
            
        </section>

    );
}

export default SuggestedForYouComponent