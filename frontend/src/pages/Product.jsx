import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Loader2, Plus } from "lucide-react";
import { productStore } from "../store/productStore";
import SideModalComponent from "../components/SideModalComponent";
import CarouselComponent from "../components/CarouselComponent";
import FilterComponent from "../components/FilterComponent";

function Product() {
  const { parentId } = useParams();
  const { allProducts, isFetchingAllProducts, getProductsByCategoryId,getProductsByParentId, productSubCategory, sideModalOpen, setSideModalOpen, selectedProduct, setSelectedProduct } = productStore();
  // const [] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState([]);
  const [showTagProduct, setShowTagProduct] = useState("all");
  const [showProduct, setShowProduct] = useState(allProducts);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [filter, setFilter] = useState({
    type: [],
    colour:[],
    size:[]
  });
  const [showFilterProducts, setShowFilterProducts] = useState(showProduct);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const  showTag  = searchParams.get("showTag");
  
  // console.log(showTag)
  // if(showTagProduct === "All"){
  //   setShowProduct(allProducts);
  // }else{
  //   // setShowProduct()
  // }
  useEffect(() => {
    getProductsByParentId([parentId])
  }, [parentId]);
  useEffect(() => {
  console.log("sideModalOpen changed:", sideModalOpen);
}, [sideModalOpen]);

  useEffect(() => {
    if (showTag) {
      setShowTagProduct(showTag);
    }
  }, [showTag]);

  useEffect(() => {
    
    if (showTagProduct === "all") {
      setShowProduct(allProducts);
      setShowFilterProducts(allProducts)
    } else {
      setShowProduct(allProducts.filter(p => (p.category.name).toLowerCase() === showTagProduct));
      if(showProduct.length === 0){
        setShowTagProduct("all")
      }else{
        setShowFilterProducts(allProducts.filter(p => (p.category.name).toLowerCase() === showTagProduct));
      }
    }
  }, [showTagProduct, allProducts]);

  useEffect(() => {
    if(!(filter.type.length === 0)){
      setShowFilterProducts(showProduct.filter(p => filter.type.includes(p.type)));
    }
    if(!(filter.colour.length === 0)){
      setShowFilterProducts(showProduct.filter(p => filter.colour.includes(p.colour)));
    }
    if(!(filter.size.length === 0)){
      console.log(
    "yeh list hai jii",
    showProduct.filter(p =>
      p.inventory.some(elem =>
        filter.size.includes(elem.size)
      )
    )
  )
      setShowFilterProducts(showProduct.filter(p =>
      p.inventory.some(elem =>
        filter.size.includes(elem.size)
      )
    ));
    }
    if(filter.type.length === 0 && filter.colour.length === 0 && filter.size.length === 0){
      setShowFilterProducts(showProduct);
    }


  },[filter])

  console.log(filter)



console.log("sare products", allProducts)

  return (
    <div className="min-h-screen pt-6">
      {isFetchingAllProducts && allProducts ? <div className=" h-screen flex justify-center items-center"><Loader2 size={32} className="animate-spin" /></div> : (<>
        <div className="inline-flex gap-4 ml-4 pt-4 cursor-pointer border-b-black/10 border-b">
          {["all", ...productSubCategory].map((elem, idx) => (<span key={idx} onClick={() => setShowTagProduct(elem)} className={`hover:text-black/50 cursor-pointer px-2 ${showTagProduct === elem ? "border-b-2" : ""}`} contentEditable={false}>
            {/* {console.log(productSubCategory)} */}
            {elem.toUpperCase()}
          </span>))}
        </div>

        <div className="text-black-500 text-sm pt-4 px-4 font-medium mx-4 flex justify-between w-full">
          <div>{showFilterProducts.length} Products</div>
          <div className="flex cursor-pointer pr-6 items-center" onClick={() => setOpenFilterModal(true)}>Filter <Plus size={16}/></div>
        </div>
        {openFilterModal && <FilterComponent setModalOpen={setOpenFilterModal} products={showProduct} filter={filter} setFilter={setFilter}/>}
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(330px,1fr))] gap-y-6 py-6 gap-x-2 px-4 ">

          {/* // <div className="max-w-[90%] bg-red-500 gap-2 gap-y-10  flex flex-wrap justify-start"> */}

          {showFilterProducts.map((elem) => (<div key={elem.id} className="relative h-fit w-full rounded-lg cursor-pointer " onClick={() => navigate(`/product/${elem.id}`)}>
            <CarouselComponent imageArr={[elem.mainImage, ...elem.subImage]} />


            <div className="font-medium tracking-tight max-w-64 px-4 mt-2 h-[8px]">{elem.name}</div>
            <div className="px-4 py-3 mt-2">₹{elem.price}</div>

            <div className="absolute bottom-3 right-3  cursor-pointer">
              <Plus onClick={(e) => {
                e.stopPropagation()
                setSelectedProduct(elem)
                
                setSideModalOpen(true)
                
              }} size={20} />
            </div>
          </div>))}
          {sideModalOpen && <SideModalComponent setSideModalOpen={setSideModalOpen} product={selectedProduct} />}

        </div>
      </>
      )}

    </div>

  );
}

export default Product;
