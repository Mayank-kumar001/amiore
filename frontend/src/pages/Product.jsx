import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Loader2, Plus } from "lucide-react";
import { productStore } from "../store/productStore";
import SideModalComponent from "../components/SideModalComponent";
import CarouselComponent from "../components/carouselComponent";

function Product() {
  const { parentId } = useParams();
  const { allProducts, isFetchingAllProducts, getProductsByCategoryId,getProductsByParentId, productSubCategory } = productStore();
  const [sideModalOpen, setSideModalOpen] = useState(false);
  const [selecetedProduct, setSelectedProduct] = useState([]);
  const [showTagProduct, setShowTagProduct] = useState("All");
  const [showProduct, setShowProduct] = useState(allProducts);
  const navigate = useNavigate();
  // if(showTagProduct === "All"){
  //   setShowProduct(allProducts);
  // }else{
  //   // setShowProduct()
  // }
  useEffect(() => {
    getProductsByParentId([parentId])
  }, [parentId]);

  useEffect(() => {
    if (showTagProduct === "All") {
      setShowProduct(allProducts);
    } else {
      setShowProduct(allProducts.filter(p => p.category.name === showTagProduct));
    }
  }, [showTagProduct, allProducts]);




  return (
    <div className="min-h-screen pt-6">
      {isFetchingAllProducts && allProducts ? <div className=" h-screen flex justify-center items-center"><Loader2 size={32} className="animate-spin" /></div> : (<>
        <div className="inline-flex gap-4 ml-4 pt-4 cursor-pointer border-b-black/10 border-b">
          {["All", ...productSubCategory].map((elem, idx) => (<span key={idx} onClick={() => setShowTagProduct(elem)} className={`hover:text-black/50 cursor-pointer px-2 ${showTagProduct === elem ? "border-b-2" : ""}`} contentEditable={false}>
            {/* {console.log(productSubCategory)} */}
            {elem}
          </span>))}
        </div>

        <div className="text-black-500 text-sm pt-4 px-2 font-medium mx-4">{showProduct.length} Products</div>
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(330px,1fr))] gap-y-6 py-6 gap-x-2 ">

          {/* // <div className="max-w-[90%] bg-red-500 gap-2 gap-y-10  flex flex-wrap justify-start"> */}

          {showProduct.map((elem) => (<div key={elem.id} className="relative h-fit w-full shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_-24px_68px_rgba(47,48,55,0.05),0_-2px_3px_rgba(0,0,0,0.04)] rounded-lg cursor-pointer " onClick={() => navigate(`/product/${elem.id}`)}>
            <CarouselComponent imageArr={[elem.mainImage, ...elem.subImage]} />


            <div className="font-medium tracking-tight max-w-60 px-4 mt-2 h-[48px]">{elem.name}</div>
            <div className="px-4 py-3 mt-2">₹{elem.price}</div>

            <div className="absolute bottom-3 right-3  cursor-pointer">
              <Plus onClick={(e) => {
                e.stopPropagation()
                setSelectedProduct(elem)
                setSideModalOpen(true)
              }} size={20} />
            </div>
          </div>))}
          {sideModalOpen && <SideModalComponent setSideModalOpen={setSideModalOpen} product={selecetedProduct} />}

        </div>
      </>
      )}

    </div>

  );
}

export default Product;
