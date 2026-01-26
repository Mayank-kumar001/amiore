import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MoveRightIcon,
  Search,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { authStore } from "../store/authStore";
import { CategoryStore } from "../store/categoryStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function HamburgerComponent({ secondaryHamburgerOpen, setSecondaryHamburgerOpen, isSearch, setIsSearch }) {
  const { hamburgerOpen, setHamburgerOpen } = authStore();
  const { categories, getAllCategories } = CategoryStore();
  const [subcategoryItems, setSubcategoryItems] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentCategory, setCurrentCategory] = useState(null);
  const inputRef = useRef(null);
  const isHomePage = location.pathname === "/"

  const sidebarImg = [
    "https://images.unsplash.com/photo-1768156741982-1f17dc20a287?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1768215592110-6283f76ac552?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDR8RnpvM3p1T0hONnd8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1442328166075-47fe7153c128?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1lbnxlbnwwfDB8MHx8fDA%3D"

  ]

  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    console.log("Ooo beta", isSearch)
    if(isSearch){
      inputRef.current.focus();
    }
  },[isSearch])

  console.log(subcategoryItems)

  /* ---------------- BUILD CATEGORY TREE ---------------- */
  const roots = useMemo(() => {
    const map = {};
    const rootsArr = [];

    categories.forEach((cat) => {
      map[cat.id] = { ...cat, children: [] };
    });

    categories.forEach((cat) => {
      if (cat.parentId === null) {
        rootsArr.push(map[cat.id]);
      } else if (map[cat.parentId]) {
        map[cat.parentId].children.push(map[cat.id]);
      }
    });

    return rootsArr;
  }, [categories]);

  /* ---------------- SEARCH CATEGORY ---------------- */
  const searchCategory = (tree, term) => {
    if (!tree || !term) return null;

    const lower = term.toLowerCase();

    for (const node of tree) {
      if (node.name.toLowerCase().includes(lower)) return node;
      if (node.children?.length) {
        const found = searchCategory(node.children, term);
        if (found) return found;
      }
    }
    return null;
  };

  /* ---------------- ANIMATIONS ---------------- */
  const sidebarVariant = {
    open: { x: 0, transition: { duration: 0.3 } },
    close: { x: "-100%", transition: { duration: 0.3 } },
  };
  const secondsidebarVariant = {
    open: { x: "40%", transition: { duration: 0.3 } },
    close: { x: "-1%", transition: { duration: 0.3 } },
  };

  /* ---------------- JSX ---------------- */
  return (
    <>
      {/* Mobile Overlay */}
      {hamburgerOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-10 sm:hidden "
          onClick={() => {
            setHamburgerOpen(false);
            setSecondaryHamburgerOpen(false);
          }}
        />
      )}

      <AnimatePresence>
        {/* PRIMARY SIDEBAR */}
        {hamburgerOpen && (
          <motion.div
            variants={sidebarVariant}
            initial="close"
            animate="open"
            exit="close"
            className={`
              fixed ${isHomePage ? "top-24" : "top-15"} left-0 z-20 h-screen
              bg-white text-black shadow-xl
              w-full sm:w-[28rem]
            `}
          >


            {/* Search */}
            <div className="flex items-center border-b border-neutral-300 px-3 h-12">
              <input
                ref={inputRef}
                className="w-full h-full focus:outline-none"
                placeholder="Search category"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Search
                size={16}
                className="cursor-pointer"
                onClick={() => {
                  const result = searchCategory(roots, searchInput);
                  if (result) {
                    navigate(
                      `/products/${result.parentId}?showTag=${result.name}`
                    );
                    setHamburgerOpen(false);
                  } else {
                    toast.error("Category not found");
                  }
                }}
              />
            </div>

            {/* Categories */}
            <div className="flex flex-col">
              {roots.map((cat, idx) => (
                <div
                  key={cat.id}
                  className="flex justify-between items-center px-4 py-3 hover:bg-neutral-100 cursor-pointer"
                  onClick={() => {
                    if (!cat.children.length) {
                      navigate(`/products/${cat.id}`);
                      setHamburgerOpen(false);
                    } else {
                      setSubcategoryItems(cat.children);
                      setCurrentCategory(cat);
                      // setSecondaryHamburgerOpen((prev) => {
                      //   console.log("idx1:", idx);
                      //   console.log("idx2:", (roots.indexOf(cat)));
                      //   if (roots.indexOf(cat) === idx) {
                      //     return !prev;
                      //   }
                      //   return prev;
                      // });
                      setSecondaryHamburgerOpen((prev) =>{
                        if(cat === currentCategory){
                          if(currentCategory.children.length > 0){
                            return !prev
                          }
                          return prev
                        }
                        return true
                      });
                    }
                  }}
                >
                  <span className="text-xs">{cat.name.toUpperCase()}</span>
                  {cat.children.length > 0 && <MoveRightIcon size={12} />}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* SECONDARY SIDEBAR */}
        {secondaryHamburgerOpen && (
          <motion.div
            variants={secondsidebarVariant}
            initial="close"
            animate="open"
            exit="close"
            className={`
              fixed ${isHomePage ? "top-24" : "top-15"} z-10 h-screen
              bg-white text-black 
              w-full sm:w-[24rem]
              left-0 sm:left-[18rem]
            `}
          >
            {/* <div className="flex justify-end px-4 py-3 border-b">
              <X
                className="cursor-pointer"
                onClick={() => setSecondaryHamburgerOpen(false)}
              />
            </div> */}
            <div className="relative">
              <img
                src={sidebarImg[(Math.random() * sidebarImg.length) | 0]}
                className="w-full object-contain h-[300px]"
              />
              <div className="text-white flex items-center gap-2 absolute bottom-8 left-5 group hover:cursor-pointer hover:text-gray-200 text-xs" onClick={() => {
                navigate(`/products/${currentCategory.id}?showTag=all`)
                setHamburgerOpen(false)
                setSecondaryHamburgerOpen(false)
              }}>

                <div>{currentCategory.name.toUpperCase()}</div>
                <div className="group-hover:translate-x-2"><MoveRightIcon size={12} /></div>
              </div>
            </div>

            {subcategoryItems.map((sub) => (
              <div
                key={sub.id}
                className="px-4 py-3 hover:bg-neutral-100 cursor-pointer"
                onClick={() => {
                  navigate(
                    `/products/${sub.parentId}?showTag=${sub.name}`
                  );
                  setSecondaryHamburgerOpen(false);
                  setHamburgerOpen(false);
                }}
              >
                {sub.name.toUpperCase()}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default HamburgerComponent;
