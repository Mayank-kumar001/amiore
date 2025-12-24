import React, { useEffect, useRef, useState } from 'react'
import { Menu, ShoppingBag, User } from 'lucide-react'
import { useLocation, useNavigate } from "react-router"
import { authStore } from '../store/authStore';
import { useMotionValueEvent, useScroll, motion } from "motion/react"

function Navbar({ setAuthModalOpen, setCartModalOpen, setHamburgerOpen }) {
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

    return (
        <motion.div
            initial={{
                backgroundColor: isHomePage ? "white" : "transparent",
                color: isHomePage ? "white" : "black"
            }}
            animate={{
                backgroundColor: scrolled || !isHomePage ? "white" : "transparent",
                color: scrolled || !isHomePage ? "black" : "white",
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

            className={`fixed z-10 w-full flex justify-between items-center px-1 md:px-4 py-2  hover:bg-white hover:text-black ${!isHomePage && `shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]`}`} onMouseOver={() => setNavHover(true)} onMouseOut={() => setNavHover(false)}>
            <div>
                <ul className='flex gap-4 items-center'>
                    <li onClick={() => {
                        setHamburgerOpen(true);
                    }}><Menu /></li>
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
            <div className=''><img src={navHover || scrolled || !isHomePage ? "https://res.cloudinary.com/dinmal6os/image/upload/v1758807332/image_la5ywz.png" : `https://res.cloudinary.com/dinmal6os/image/upload/v1758806593/image_zlorcr.png`} alt="" width={"150px"} /></div>
            <div className='hidden md:flex pr-4'>
                <ul className='flex gap-6 items-center cursor-pointer'>
                    <li onClick={() => {
                        if (authState === "authenticated") {
                            navigate("/profile")
                        } else {
                            setAuthModalOpen(true)
                        }
                    }}><User /></li>
                    <li><ShoppingBag onClick={() => {
                        setCartModalOpen(true)
                    }} /></li>
                </ul>
            </div>
        </motion.div>
    )
}

export default Navbar