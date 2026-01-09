import { MoveLeft, MoveRight } from "lucide-react"
import React, { useState } from "react"
import { motion } from "motion/react"

function CarouselComponent({ imageArr = [] }) {
  const [index, setIndex] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [touchStart, setTouchStart] = useState(null)

  const throttle = () => {
    setDisabled(true)
    setTimeout(() => setDisabled(false), 500)
  }

  const moveRight = (e) => {
    e?.stopPropagation()
    if (disabled) return

    setIndex((prev) => (prev + 1) % imageArr.length)
    throttle()
  }

  const moveLeft = (e) => {
    e?.stopPropagation()
    if (disabled) return

    setIndex((prev) => (prev - 1 + imageArr.length) % imageArr.length)
    throttle()
  }

  /* Swipe support */
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    if (!touchStart) return
    const diff = touchStart - e.changedTouches[0].clientX

    if (diff > 50) moveRight()
    if (diff < -50) moveLeft()

    setTouchStart(null)
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg group"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Image */}
      <img
        src={imageArr[index]}
        alt=""
        className="w-full h-[400px] sm:h-[300px] md:h-[400px] object-cover object-center"
      />

      {/* Left Button */}
      <button
        onClick={moveLeft}
        className="absolute top-1/2 left-3 -translate-y-1/2 
                   bg-black/50 text-white p-2 rounded-full 
                   opacity-100 md:opacity-0 md:group-hover:opacity-100 
                   transition"
      >
        <MoveLeft size={20} />
      </button>

      {/* Right Button */}
      <button
        onClick={moveRight}
        className="absolute top-1/2 right-3 -translate-y-1/2 
                   bg-black/50 text-white p-2 rounded-full 
                   opacity-100 md:opacity-0 md:group-hover:opacity-100 
                   transition"
      >
        <MoveRight size={20} />
      </button>

      {/* Progress Bar */}
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: `${((index + 1) / imageArr.length) * 100}%` }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 h-1 bg-black"
      />
    </div>
  )
}

export default CarouselComponent
