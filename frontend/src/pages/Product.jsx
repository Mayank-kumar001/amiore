import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Loader2, Plus } from "lucide-react";
import { productStore } from "../store/productStore";
import SideModalComponent from "../components/SideModalComponent";

function Product() {
  const { categoryId } = useParams();
  const { allProducts, isFetchingAllProducts, getProductsByCategoryId } = productStore();
  const [sideModalOpen, setSideModalOpen] = useState(false);
  const [selecetedProduct, setSelectedProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("1 hello enter");
    getProductsByCategoryId(categoryId)
  },[categoryId]);

  useEffect(() => {
    console.log("my data", allProducts);

  },[allProducts])
  return (
    <div className="h-screen">
      {isFetchingAllProducts && allProducts ? <div className=" h-full flex justify-center items-center"><Loader2 size={32} className="animate-spin"/></div> :(
        <div className="grid w-screen grid-cols-2 place-items-center gap-y-10 py-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allProducts.map((elem) => (<div key={elem.id} className="relative h-fit w-fit shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_-24px_68px_rgba(47,48,55,0.05),0_-2px_3px_rgba(0,0,0,0.04)] rounded-lg cursor-pointer" onClick={() => navigate(`/product/${elem.id}`)}>
          <div className="">
            {/* h-[236px] w-[170px] md:h-[449px] md:w-[323px] lg:h-[449px] lg:w-[300px] xl:h-[430px] xl:w-[330px] */}
            <img
              src={elem.mainImage}
              alt=""
              width={"330px"}
              height={"430px"}
            />
          </div>
          
          <div className="font-medium tracking-tight max-w-60 px-4 mt-2 h-[48px]">{elem.name}</div>
          <div className="px-4 py-3">₹{elem.price}</div>
         
          <div className="absolute top-[425px] right-2 bottom-0 cursor-pointer">
            <Plus onClick={(e) => {
              e.stopPropagation()
              setSelectedProduct(elem)
              setSideModalOpen(true)
            }} size={20} />
          </div>
        </div>))}
        {sideModalOpen && <SideModalComponent setSideModalOpen={setSideModalOpen} product={selecetedProduct} /> }

      </div>
      )}
      
    </div>
  );
}

export default Product;
