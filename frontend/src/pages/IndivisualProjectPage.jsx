import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { productStore } from '../store/productStore'
import { Loader2 } from 'lucide-react'
import SideModalComponent from '../components/SideModalComponent'

function IndivisualProjectPage() {
  const { productId } = useParams()
  console.log({ productId })
  const { isFetchingProductDetails, currentProduct, getProductByProductId } = productStore()
   const [sideModalOpen, setSideModalOpen] = useState(false);

  useEffect(() => {
    getProductByProductId(productId);
  }, [getProductByProductId, productId])
  if (isFetchingProductDetails || !currentProduct) {
    return <div className='h-screen flex justify-center items-center'>
      <Loader2 className='animate-spin'></Loader2>
    </div>
  }
  return (
    <div className='min-h-screen flex'>
      {console.log("from div", currentProduct)}
      <div className='h-screen w-[50%]'><img src={currentProduct.mainImage} /></div>
      <div className='h-screen w-[50%]  py-24 px-16'>
        <div className="flex font-bold justify-between">
          <div>{currentProduct.name}</div>
          <div>₹{currentProduct.price}</div>
        </div>
        <div className="flex justify-center" >
          <button onClick={() => setSideModalOpen(true)} className="bg-black w-full py-4 cursor-pointer text-white mt-24">Add to Bag</button>
        </div>
        {sideModalOpen && <SideModalComponent setSideModalOpen={setSideModalOpen} product={currentProduct} /> }
      </div>


    </div>


  )
}

export default IndivisualProjectPage