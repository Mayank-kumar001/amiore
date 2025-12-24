import { MoveLeft, MoveRight } from 'lucide-react'
import React, { useState } from 'react'
import { motion } from "motion/react"

function CarouselComponent({ imageArr }) {
  let [index, setIndex] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const moveRight = (e) => {
    e.stopPropagation()
    
    if (!disabled) {
      setIndex((prev) => {
        const newIndex = (prev + 1) % imageArr.length;
        setDisabled(true)
        setInterval(() => {
          setDisabled(false)
        }, 1000); // wrap around
        return newIndex;
      })
    }

  }
  const moveLeft = (e) => {
    e.stopPropagation()
    if (!disabled) {
      setIndex((prev) => {
        const newIndex = (prev - 1 + imageArr.length) % imageArr.length;
        setDisabled(true)
        setInterval(() => {
          setDisabled(false)
        }, 1000); // wrap around
        return newIndex;
      })
    }
  }
  
  return (
    <div className='bg-black-500 w-full h-[50%] relative crousel-container group'>
      <img className='' src={imageArr[index]} alt=""/>
      <div className='lg:hidden absolute top-1/2 left-2 group-hover:block' onClick={moveLeft}><MoveLeft size={16} /></div>
      <div className='lg:hidden absolute top-1/2 right-2 group-hover:block' onClick={moveRight}><MoveRight size={16} /></div>
      
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: `${((index + 1) / imageArr.length) * 100}%` }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className='absolute bottom-0 left-0 h-0.5 bg-black '
      />
    </div>
  )
}

export default CarouselComponent
