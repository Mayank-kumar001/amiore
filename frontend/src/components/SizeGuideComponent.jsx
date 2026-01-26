import {motion} from 'motion/react'
import { Loader2, X } from "lucide-react";
export default function SizeGuideComponent({setSideModalOpen}) {
  const sizes = [
    { size: "XS", shoulder: 41.5, chest: 50, waist: 49 },
    { size: "S", shoulder: 43.5, chest: 52.5, waist: 51.5 },
    { size: "M", shoulder: 45.5, chest: 55, waist: 54 },
    { size: "L", shoulder: 47.5, chest: 57.5, waist: 56.5 },
    { size: "XL", shoulder: 49.5, chest: 60, waist: 59 },
    { size: "XXL", shoulder: 51.5, chest: 62.5, waist: 61.5 },
  ];

  return (
    <div className="fixed z-20 inset-0 flex h-full w-full items-center justify-center bg-black/50">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
          filter: `blur(4px)`,
          width: 0,
          height: "100vh",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: `blur(0px)`,
          width: window.innerWidth < 768 ? "100%" : "50%",
        }}
        exit={{
          opacity: 0,
          scale: 0.8,
          filter: `blur(4px)`,
          width: 0,
          height: "100vh",
        }}
        className="absolute overflow-y-auto right-0 min-h-screen bg-white px-6 sm:px-8 md:px-10 py-8 sm:py-10 flex flex-col "
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-semibold text-gray-800">
            SizeGuide
          </div>
          <X
            className="cursor-pointer hover:rotate-90 transition-transform duration-300"
            onClick={() => setSideModalOpen(false)}
            size={24}
          />
        </div>

        {/* Product Info */}
        <div className="w-full mx-auto px-4 py-10 text-black">
      {/* Title */}
      

      {/* Subtitle */}
      <h3 className="text-base font-semibold mb-8">
        Shirts: Standard Fit - Short Sleeve
      </h3>

      {/* Table */}
      <div className="overflow-x-auto  ">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 font-medium"></th>
              <th className="text-left py-4 font-medium">SHOULDER</th>
              <th className="text-left py-4 font-medium">CHEST</th>
              <th className="text-left py-4 font-medium">WAIST</th>
            </tr>
          </thead>

          <tbody>
            {sizes.map((row) => (
              <tr
                key={row.size}
                className="border-b border-gray-100 last:border-none"
              >
                <td className="py-4">{row.size}</td>
                <td className="py-4">{row.shoulder}</td>
                <td className="py-4">{row.chest}</td>
                <td className="py-4">{row.waist}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Unit Toggle */}
      <div className="flex items-center gap-8 mt-10 text-sm">
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="w-3.5 h-3.5 bg-black border border-black"></span>
          <span>CM</span>
        </div>

        {/* <div className="flex items-center gap-2 cursor-pointer">
          <span className="w-3.5 h-3.5 border border-black"></span>
          <span>INCH</span>
        </div> */}
      </div>
    </div>

      </motion.div>
    </div>



    
  );
}
