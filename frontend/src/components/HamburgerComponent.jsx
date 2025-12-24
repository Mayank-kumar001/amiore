import React, { useEffect, useState } from 'react'
import { ArrowBigLeft, ArrowBigRight, ChartArea, ChevronLeft, ChevronRight, House, Loader2, MoveRight, MoveRightIcon, Settings, User, X } from "lucide-react"
import { motion, scale, stagger } from "motion/react"
import { authStore } from '../store/authStore'
import { CategoryStore } from '../store/categoryStore';
import { useNavigate } from "react-router-dom"
function HamburgerComponent() {

  const [categoryGender, setCategoryGender] = useState("male")
  const { hamburgerOpen, setHamburgerOpen } = authStore();
  const [ secondaryHamburgerOpen, setSecondaryHamburgerOpen ] = useState(false)
  const [subcategoryItems, setSubcategoryItems] = useState([])
  const { categories, fetchingCategories, getAllCategories } = CategoryStore()
  const navigate = useNavigate();
  const mensCategory = categories.filter((elem) => elem.gender === "male")
  const womensCategory = categories.filter((elem) => elem.gender === "female")


  console.log("hellllo debug", categories)
  const categoryItems = []
  for (let i = 0; i < categories.length; i++) {
    categories[i].children = []
    if (categories[i].parentId === null) {
      categoryItems.push(categories[i])
      continue
    }
    for (let j = 0; j < categories.length; j++) {
      if (categories[i].parentId === categories[j].id) {
        if (categories[j].parentId === null) {
          categories[j].children.push(categories[i])
          continue
        }
        categories[j].children.push(categories[i])
      }
    }


  }

  console.log(categoryItems)
  // const l1Category = categories.filter((elem) => elem.parentId ===null)
  // const l2Category = categories.filter((elem) => elem.parentId ===null)

  const sidebarVariant = {
    open: {
      width: "24rem",
      transition: { duration: 0.3, ease: "easeInOut" },
    },

    close: {
      width: "4rem",
      transition: { duration: 0.3, ease: "easeInOut" },
    }
  }
  const borderVariant = {
    open: {
      width: "50%",
      transition: { duration: 0.3, ease: "easeInOut" },
    },

    close: {
      width: "0",
      transition: { duration: 0.3, ease: "easeInOut" },
    }
  }
  useEffect(() => {
    getAllCategories();

  }, [])

  console.log("hii", categories)

  return (
    <>

      {hamburgerOpen && <motion.div
        initial={"close"}
        animate={hamburgerOpen ? "open" : "close"}
        exit={"close"}
        variants={sidebarVariant}
        className='bg-white text-black w-[18rem] h-screen fixed z-20 top-0 shadow-[15px_20px_20px_10px_#00000024] rounded-r-[6px] '>
        <div className='w-full flex justify-between mb-4 px-2'>
          <span className='text-neutral-700'>Categories</span>
          {!secondaryHamburgerOpen && <span className='cursor-pointer ' onClick={() => setHamburgerOpen(false)}><X /></span>}
        </div>
        <div className='flex flex-col'>
          {categoryItems.map((elem) => (<div key={elem.id} className='flex justify-between py-2 px-4 text-black/80 hover:bg-neutral-200 hover:cursor-pointer' onClick={() => {
            if(!(elem.children.length)){
              return navigate(`/products/${elem.id}`)
            }
            setSubcategoryItems(elem.children)
            setSecondaryHamburgerOpen(true)

          }}>
            <span>{elem.name}</span>
            {elem.children.length > 0 && <span><MoveRightIcon size={16} /></span>}
          </div>))}
        </div>


        {/* <div className='w-full flex justify-center mt-4'>
          <span className={`${categoryGender === "male" ? "  text-neutral-950 font-medium bg-neutral-100 rounded-r-[4px]" : "text-neutral-500 text-sm"} w-[50%] p-1 cursor-pointer  px-4`} onClick={() => setCategoryGender("male")}>MENS</span>
          <span className={`${categoryGender === "female" ? "  text-neutral-950 font-medium bg-neutral-100 rounded-r-[4px]" : "text-neutral-500 text-sm"}  w-[50%] p-1 cursor-pointer text-right px-4 `} onClick={() => setCategoryGender("female")}>WOMENS</span>
        </div>
        <div className='w-full flex justify-between gap-2'>
          <motion.span
          initial={"close"}
          animate={categoryGender === "male" ? "open" : "close"}
          exit={"close"}
          variants={borderVariant}
           className='w-full bg-neutral-700 h-0.5'></motion.span>
          <motion.span
          initial={"close"}
          animate={categoryGender === "female" ? "open" : "close"}
          exit={"close"}
          variants={borderVariant}
           className='w-full bg-neutral-700 h-0.5'></motion.span>
        </div> */}
        {/* <div className='w-full h-full flex justify-center items-center'>
          {categories ? <div className='w-full h-full mt-6'>
            {
              categoryGender === "male" ? mensCategory.map((elem) => <div className=' w-full hover:bg-neutral-100 p-2 px-4 text-sm flex justify-between cursor-pointer' key={elem.id} onClick={() => navigate(`/products/${elem.id}`)}>
                <span>{elem.name}</span>
                <span><MoveRight size={"16"}/></span>
              </div>)
              :womensCategory.map((elem) => <div className=' w-full hover:bg-neutral-100 p-2'>{elem.name}</div>)
            }
          </div> : <Loader2/>}
        </div> */}

      </motion.div>}
      {secondaryHamburgerOpen && <motion.div
        initial={"close"}
        animate={setSecondaryHamburgerOpen ? "open" : "close"}
        exit={"close"}
        variants={sidebarVariant}
        className='bg-white text-black w-[24rem] h-screen fixed left-[285px] z-20 top-0 shadow-[4px_0px_4px_0px_#00000024] rounded-r-[6px] '>
        <div className='w-full flex justify-end mb-4 px-2'>
          {/* <span className='text-neutral-700'>Categories</span> */}
          <span className='cursor-pointer' onClick={() => {
            setHamburgerOpen(false)
            setSecondaryHamburgerOpen(false)
            }}><X /></span>
        </div>
        <div className=''>
          <img src="https://calibre.com.au/cdn/shop/files/1711_MENU_TILE_1_All_Clothing.jpg?format=webp&v=1763433359&width=1000" alt=""  className='object-cover object-center w-full'/>
          {subcategoryItems.map((elem) => (<div key={elem.id} className='flex flex-col justify-between py-2  text-black/80 hover:bg-neutral-200 hover:cursor-pointer'>
            <span className='px-4'>{elem.name}</span>
            {/* {elem.children.length > 0 && <span><MoveRightIcon size={16} /></span>} */}
          </div>))}
        </div>


        

      </motion.div>}
    </>
  )
}

export default HamburgerComponent
