import React, { useEffect, useRef, useState } from 'react'
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useLocation, useNavigate } from "react-router"
import { authStore } from '../store/authStore';
import { useMotionValueEvent, useScroll, motion } from "motion/react"

function Navbar({ setAuthModalOpen, setCartModalOpen, setHamburgerOpen, hamburgerOpen, setSecondaryHamburgerOpen,secondaryHamburgerOpen, hello, isSearch, setIsSearch  }) {
    // console.log("hello world1", setSecondaryHamburgerOpen)
    // console.log("hello world2", secondaryHamburgerOpen)
    // console.log("hello world3", hello)
    
    const [navHover, setNavHover] = useState(false)
    const navigate = useNavigate();
    const { authState } = authStore();
    const [scrolled, setScrolled] = useState(false);
    
    const location = useLocation();
      const isHomePage = location.pathname === "/";
   
    useEffect(() => {

        if (location.pathname !== "/") {
            setScrolled(false);
            return;
        }


        const handleScroll = () => {
            console.log("hello world")
            if (window.scrollY === 0) {
                setScrolled(false); // top of page
            } else {
                setScrolled(true); // user scrolled down
            }
        };

        // run once initially
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    useEffect(() => {
  if (hamburgerOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [hamburgerOpen]);

useEffect(() => {
    console.log(isSearch, hamburgerOpen)
},[isSearch, hamburgerOpen])
    
    console.log("hello world0", hamburgerOpen)
    

    return (
        <motion.div
            initial={{
                backgroundColor: isHomePage || hamburgerOpen ? "white" : "transparent",
                color: isHomePage ? "white" : "black"
            }}
            animate={{
                backgroundColor: scrolled || !isHomePage || hamburgerOpen ? "white" : "transparent",
                color: scrolled || !isHomePage || hamburgerOpen ? "black" : "white",
                top: scrolled || !isHomePage ? "0px" : ""
            }}
            whileHover={{

                backgroundColor: "white",
                color: "black",


            }}
            transition={{
                duration: 0.1,
                // delay: 0.5,
                ease: "easeIn"
            }}
        
            className={`fixed z-10 w-full flex justify-between items-center px-1 md:px-4 py-2   ${!isHomePage && `shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]`}`} onMouseOver={() => setNavHover(true)} onMouseOut={() => setNavHover(false)}>
            <div>
                <ul className='flex gap-4 items-center'>
                    <li className='cursor-pointer'>{hamburgerOpen ? <X size={18} onClick={() => {
                        setSecondaryHamburgerOpen(false)
                        setHamburgerOpen(false);
                    }}/> : <Menu size={18} onClick={() => {
                        setHamburgerOpen(true);
                    }}/>}</li>
                    <li>NEW ARRIVALS</li>
                    <li className='flex gap-2 cursor-pointer' onClick={() => {
                        setIsSearch((prev) => !prev)
                        if(hamburgerOpen){
                            setHamburgerOpen(false)
                        }else{
                            setHamburgerOpen(true)
                        }   

                        }}><span className='flex items-center'>
                            {hamburgerOpen ? <X size={18} /> : <Search size={18} />}
                            <span>{hamburgerOpen ? "CLOSE" : "SEARCH"}</span>
                            </span>
                            </li>
                    <li className='md:hidden' onClick={() => {
                        if (authState === "authenticated") {
                            navigate("/profile")
                        } else {
                            setAuthModalOpen(true)
                        }
                    }}><User /></li>
                    <li className='md:hidden'><ShoppingBag onClick={() => {
                        setCartModalOpen(true)
                    }} /></li>
                </ul>
            </div>
            <div className='cursor-pointer' onClick={() => navigate("/")}><img src={navHover || scrolled || !isHomePage || hamburgerOpen ? "https://res.cloudinary.com/dinmal6os/image/upload/v1758807332/image_la5ywz.png" : `https://res.cloudinary.com/dinmal6os/image/upload/v1758806593/image_zlorcr.png`} alt="" width={"150px"} /></div>
            <div className='hidden md:flex pr-4'>
                <ul className='flex gap-6 items-center cursor-pointer'>
                    <li onClick={() => {
                        if (authState === "authenticated") {
                            navigate("/profile")
                        } else {
                            setAuthModalOpen(true)
                        }
                    }}><span>ACCOUNT</span></li>
                    <li><span onClick={() => {
                        setCartModalOpen(true)
                    }} >BAG</span></li>
                </ul>
            </div>
        </motion.div>
    )
}

export default Navbar