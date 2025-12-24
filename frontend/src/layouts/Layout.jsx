import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import AuthModalComponent from '../components/AuthModalComponent';
import CartModalComponent from '../components/CartModalComponent';
import { authStore } from '../store/authStore';
import { cartStore } from '../store/cartStore';
import { useMotionValueEvent, useScroll } from 'motion/react';
import Footer from '../components/Footer';
import HamburgerComponent from '../components/HamburgerComponent';

function Layout() {
  // const [authModalOpen, setAuthModalOpen] = useState(false);
  const { authModalOpen, setAuthModalOpen, setHamburgerOpen, hamburgerOpen } = authStore();
  const { cartModalOpen, setCartModalOpen } = cartStore();
  const [scrollPos, setScrollPos] = useState(0);
  // const [cartModalOpen, setCartModalOpen] = useState(false);
  useEffect(() => {
    if (authModalOpen || cartModalOpen || hamburgerOpen) {
      setScrollPos(window.scrollY);
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.body.style.overflow = "hidden";
    } else {
      window.scrollTo({ top: scrollPos, behavior: "smooth" });
      document.body.style.overflow = "auto";
    }

    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [authModalOpen, cartModalOpen]);


  return (
    <div className='min-h-screen w-full'>
      <div className='w-full bg-black text-white text-center text-xs font-medium py-2 '>NEW ARRIVALS HAVE LANDED - SHOP NOW</div>
      <Navbar setAuthModalOpen={setAuthModalOpen} setCartModalOpen={setCartModalOpen} setHamburgerOpen={setHamburgerOpen} />
      <div className="w-full h-full relative">
        <HamburgerComponent />
      </div>
      <Outlet />
      {authModalOpen && <AuthModalComponent modalOpen={authModalOpen} setModalOpen={setAuthModalOpen} />}
      {cartModalOpen && <CartModalComponent modalOpen={cartModalOpen} setModalOpen={setCartModalOpen} />}
      <Footer></Footer>
      {/* {cartModalOpen && <CartModalComponent modalOpen={cartModalOpen} setModalOpen={setCartModalOpen}/>} */}
    </div>
  )
}

export default Layout