import React, { useEffect, useRef, useState } from "react";
import { productStore } from "../store/productStore";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import {useMotionValue, useMotionValueEvent, useScroll} from "motion/react"
import SideModalComponent from "../components/SideModalComponent";

function IndivisualProjectPage() {
  const { getProductByProductId, isFetchingProductDetails, currentProduct } = productStore();
  const { productId } = useParams();
   const [sideModalOpen, setSideModalOpen] = useState(false);
  
  useEffect(() => {
    getProductByProductId(productId);
  }, [productId]  );
  console.log(currentProduct)
  
  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center">
      {isFetchingProductDetails ? (
        <Loader2 size={32} className="animate-spin" />
      ) : (
        <>
          <div className=" min-h-[95vh] w-full flex ">
            <div className="w-1/2 h-full  overflow-y-scroll">
            {console.log(currentProduct)}
              <img src={currentProduct.mainImage} alt="" />
            </div>
            <div className="w-1/2 h-full min-h-screen py-24 px-16">
              <div className="flex font-bold justify-between">
                <div>{currentProduct.name}</div>
                <div>₹{currentProduct.price}</div>
              </div>
              <div className="flex justify-center" ><button onClick={() => setSideModalOpen(true)} className="bg-black w-full py-4 text-white mt-24">Add to Bag</button></div>
            </div>
            {sideModalOpen && <SideModalComponent setSideModalOpen={setSideModalOpen} product={selecetedProduct} /> }
          </div>
        </>
      )}
    </div>
  );
}

export default IndivisualProjectPage;
