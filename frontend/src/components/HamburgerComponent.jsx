import React, { useEffect, useState } from 'react'
import { ArrowBigLeft, ArrowBigRight, ChartArea, ChevronLeft, ChevronRight, House, Loader2, MoveRight, MoveRightIcon, Search, Settings, User, X } from "lucide-react"
import { motion, scale, stagger } from "motion/react"
import { authStore } from '../store/authStore'
import { CategoryStore } from '../store/categoryStore';
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
function HamburgerComponent() {

  const [categoryGender, setCategoryGender] = useState("male")
  const { hamburgerOpen, setHamburgerOpen } = authStore();
  const [ secondaryHamburgerOpen, setSecondaryHamburgerOpen ] = useState(false)
  const [subcategoryItems, setSubcategoryItems] = useState([])
  const { categories, fetchingCategories, getAllCategories } = CategoryStore()
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const mensCategory = categories.filter((elem) => elem.gender === "male")
  const womensCategory = categories.filter((elem) => elem.gender === "female")


  console.log("hellllo debug", categories)
  const categoryItems = []
  // categories = categories.map((elem) => elem.children = [])
  // for (let i = 0; i < categories.length; i++) {
  //   categories[i].children = []
  //   console.log(categories[i].name)
  //   if (categories[i].parentId === null) {
  //     console.log("pushing as parent", categories[i].name)
  //     categoryItems.push(categories[i])
  //     continue
  //   }
  //   for (let j = 0; j < categories.length; j++) {
  //     if(i === 6)console.log("yaha dekho", categories)
  //     if (categories[i].parentId === categories[j].id) {
  //       if(i === 6)console.log("yaha andar dekho", categories)
  //         if (categories[j].parentId === null) {
  //         if(i === 6)console.log("yaha andar bhi dekho",j, categories)
  //           if(!(categories[j].children)){
  //             categories[j].children = []
  //           }
  //         if(i === 6)console.log("yaha andar bhi dekho 2",j, categories)
  //           categories[j].children.push(categories[i])
  //       if(i === 6)console.log("yaha andar bhi dekho 3",j, categories)
  //         continue
  //       }
  //       if(i === 6)console.log("yeh dekho", categories)
  //       categories[j].children.push(categories[i])
  //     }
  //   }


  // }

  const map = {};
  const roots = [];

  console.log("roots bahiyaa", roots)

  // 1️⃣ Create map & init children
  categories.forEach(cat => {
    map[cat.id] = { ...cat, children: [] };
  });

  // 2️⃣ Build tree
  categories.forEach(cat => {
    if (cat.parentId === null) {
      roots.push(map[cat.id]);
    } else {
      const parent = map[cat.parentId];
      if (parent) {
        parent.children.push(map[cat.id]);
      }
    }
  });

  console.log("roots", roots)

  const searchCategory = (tree, searchTerm) => {
    if (!tree || tree.length === 0) return null;

  const term = searchTerm.toLowerCase();

  for (const node of tree) {
    // ✅ match current node
    if (node.name.toLowerCase().includes(term)) {
      return node;
    }

    // 🔁 search children
    if (node.children?.length) {
      const found = searchCategory(node.children, term);
      if (found) return found;
    }
  }

  return null;
  }


  // console.log("hello", categoryItems)
  // const l1Category = categories.filter((elem) => elem.parentId ===null)
  // const l2Category = categories.filter((elem) => elem.parentId ===null)
    useEffect(() => {
    getAllCategories();

  }, [])

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

  // console.log("hii", categories)

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

        <div className='flex justify-between items-center pr-2 border-y-2 border-neutral-100 h-12'>
          <input className='h-full px-2 w-full focus:outline-none' type="text" placeholder='search' onChange={(e) => setSearchInput(e.target.value)} />
          <Search onClick={() => {
            console.log("bgo yeh dekho", searchCategory(roots, searchInput ))
            const output = searchCategory(roots, searchInput )
            if(output){
              navigate(`/products/${output.parentId}?showTag=${output.name}`)
              setHamburgerOpen(false)
            }else{
              toast.error("Category not found")
            }
          }}/>
        </div>


        <div className='flex flex-col'>
          {roots.map((elem) => (<div key={elem.id} className='flex justify-between py-2 px-4 text-black/80 hover:bg-neutral-200 hover:cursor-pointer' onClick={() => {
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
          {console.log("subcategory", subcategoryItems)}
          {subcategoryItems.map((elem) => (<div key={elem.id} onClick={(e) => {
            e.stopPropagation()
            navigate(`/products/${elem.parentId}?showTag=${elem.name}`)
          }} className='flex flex-col justify-between py-2  text-black/80 hover:bg-neutral-200 hover:cursor-pointer'>
            <span className='px-4'>{elem.name}</span>
            {/* {elem.children.length > 0 && <span><MoveRightIcon size={16} /></span>} */}
          </div>))}
        </div> 


        

      </motion.div>}
    </>
  )
}

export default HamburgerComponent
