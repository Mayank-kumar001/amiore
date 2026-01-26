import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { productStore } from '../store/productStore'
import { CornerDownRight, Loader2 } from 'lucide-react'
import SideModalComponent from '../components/SideModalComponent'
import { motion } from 'motion/react'
import ProductDetailComponent from '../components/ProductDetailComponent'
import SizeGuideComponent from '../components/SizeGuideComponent'

function IndivisualProjectPage() {
  const { productId } = useParams()
  const { isFetchingProductDetails, currentProduct, getProductByProductId } = productStore()
  const [sideModalOpen, setSideModalOpen] = useState(false)
  const [detailSideModalOpen, setDetailSideModalOpen] = useState(false)
  const [sizeSideModalOpen, setSizeSideModalOpen] = useState(false)
  const [data, setData] = useState({})
  const productImageRef = useRef(null)
  const [scrollImageProgress, setScrollImageProgress] = useState(0)

  console.log("bhai log yeh dekho", currentProduct)
  // Track the image container scroll directly
  useEffect(() => {
    const handleImageScroll = () => {
      const container = productImageRef.current
      if (!container) return
      
      const { scrollTop, scrollHeight, clientHeight } = container
      const progress = scrollTop / (scrollHeight - clientHeight)
      setScrollImageProgress(Math.min(Math.max(progress, 0), 1))
    }

    const container = productImageRef.current
    if (container) {
      container.addEventListener('scroll', handleImageScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleImageScroll)
      }
    }
  }, [currentProduct]) // Re-attach when product changes

  // Handle scroll hijacking
  useEffect(() => {
    const handleWheel = (e) => {
      if(document.body.style.overflow === "hidden") return;
      const imageContainer = productImageRef.current
      if (!imageContainer) return

      const { scrollTop, scrollHeight, clientHeight } = imageContainer
      const isAtTop = scrollTop === 0
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1

      // If scrolling down and not at bottom, prevent page scroll
      if (e.deltaY > 0 && !isAtBottom) {
        e.preventDefault()
        imageContainer.scrollTop += e.deltaY
      }
      // If scrolling up and not at top, prevent page scroll
      else if (e.deltaY < 0 && !isAtTop) {
        e.preventDefault()
        imageContainer.scrollTop += e.deltaY
      }
    }

    // Attach to window or document
    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [currentProduct])

  useEffect(() => {
    getProductByProductId(productId)
  }, [getProductByProductId, productId])

  if (isFetchingProductDetails || !currentProduct) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <Loader2 className='animate-spin' />
      </div>
    )
  }

  return (
    <div className='min-h-screen md:flex'>
      <div className='h-screen w-full md:w-[50%] sticky top-0'>
        <div 
          ref={productImageRef} 
          className='flex md:flex-col h-full w-full overflow-y-hidden product-scroll-container relative'
        >
          <img src={currentProduct.mainImage} alt="Main product" className='w-full object-center object-cover' />
          {currentProduct.subImage.map((elem, idx) => (
            <img key={idx} src={elem} alt={`Product ${idx + 1}`} className='w-full object-center object-cover' />
          ))}
        </div>
        <motion.div 
          className='hidden md:block fixed top-[20%] left-2 w-0.5 h-52 bg-black origin-top' 
          initial={{ scaleY: 0.3 }}
          animate={{ scaleY: scrollImageProgress }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <div className='h-[50vh] md:min-h-screen w-full md:w-[50%] py-24 px-16'>
        <div className="flex font-bold text-sm  justify-between ">
          <div>{currentProduct.name}</div>
          <div>₹{currentProduct.price}</div>
        </div>
        <div className='text-xs mt-2'>New Arrival</div>
        <div className="flex flex-col justify-center mt-20 gap-y-4">
          <div className=''>SELECT A SIZE</div>
          <button 
            onClick={() => setSideModalOpen(true)} 
            className="bg-black w-full py-4 cursor-pointer text-white"
          >
            Add to Bag
          </button>
        </div>
        <div className='flex flex-col divide-y-2 divide-neutral-100 mt-12 '>

          <div className='flex justify-between items-center py-3 cursor-pointer' onClick={() => {

            setDetailSideModalOpen(true)
            setData(currentProduct.description)
            }}>
            <span>DETAILS AND CARE</span>
            <CornerDownRight size={12} />
            </div>
          <div className='flex justify-between items-center py-3 cursor-pointer' onClick={() => setSizeSideModalOpen(true)}>
            <span>SIZE GUIDE</span>
            <CornerDownRight size={12} />
          </div>
          <div className='flex justify-between items-center py-3 cursor-pointer' onClick={() => {

            setDetailSideModalOpen(true)
            setData("For orders within Australia, CALIBRE offers complimentary standard shipping. You can expect your order to arrive between 2-7 business days.Express Shipping is available with a cost of $15, your order can be expected to arrive within 1-2 business days.Delivery times are based on Metro area, please allow for an extra 1-2 business days for regional areas. You are welcome to visit the Australia Post website to see the expected delivery times to your postcode.")
            }}>
            <span>SHIPPING</span>
            <CornerDownRight size={12} />
          </div>
          
        </div>
        {sideModalOpen && (
          <SideModalComponent 
            setSideModalOpen={setSideModalOpen} 
            product={currentProduct} 
          />
        )}
        {detailSideModalOpen && (
          <ProductDetailComponent 
            setSideModalOpen={setDetailSideModalOpen} 
            data={data} 
          />
        )}
        {sizeSideModalOpen && (
          <SizeGuideComponent 
            setSideModalOpen={setSizeSideModalOpen} 
            data={data} 
          />
        )}
      </div>
    </div>
  )
}

export default IndivisualProjectPage