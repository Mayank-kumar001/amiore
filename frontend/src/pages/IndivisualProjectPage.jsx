import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { productStore } from '../store/productStore'
import { Loader2 } from 'lucide-react'
import SideModalComponent from '../components/SideModalComponent'
import { motion } from 'motion/react'

function IndivisualProjectPage() {
  const { productId } = useParams()
  const { isFetchingProductDetails, currentProduct, getProductByProductId } = productStore()
  const [sideModalOpen, setSideModalOpen] = useState(false)
  const productImageRef = useRef(null)
  const [scrollImageProgress, setScrollImageProgress] = useState(0)

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
          className='flex md:flex-col h-full w-full bg-red-500 overflow-y-scroll product-scroll-container relative'
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
        <div className="flex font-bold justify-between ">
          <div>{currentProduct.name}</div>
          <div>₹{currentProduct.price}</div>
        </div>
        <div className="flex justify-center">
          <button 
            onClick={() => setSideModalOpen(true)} 
            className="bg-black w-full py-4 cursor-pointer text-white mt-24"
          >
            Add to Bag
          </button>
        </div>
        {sideModalOpen && (
          <SideModalComponent 
            setSideModalOpen={setSideModalOpen} 
            product={currentProduct} 
          />
        )}
      </div>
    </div>
  )
}

export default IndivisualProjectPage