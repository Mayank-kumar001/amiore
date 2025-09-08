import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import AuthModalComponent from '../components/AuthModalComponent';
import CartModalComponent from '../components/CartModalComponent';
import { authStore } from '../store/authStore';
import { cartStore } from '../store/cartStore';

function Layout() {
  // const [authModalOpen, setAuthModalOpen] = useState(false);
  const { authModalOpen, setAuthModalOpen } = authStore();
  const { cartModalOpen, setCartModalOpen } = cartStore();
  // const [cartModalOpen, setCartModalOpen] = useState(false);
 
  return (
    <div>
        <Navbar setAuthModalOpen={setAuthModalOpen} setCartModalOpen={setCartModalOpen}/>
        <Outlet/>
        {authModalOpen && <AuthModalComponent modalOpen={authModalOpen} setModalOpen={setAuthModalOpen}/>}
        {cartModalOpen && <CartModalComponent modalOpen={cartModalOpen} setModalOpen={setCartModalOpen}/>}
        {/* {cartModalOpen && <CartModalComponent modalOpen={cartModalOpen} setModalOpen={setCartModalOpen}/>} */}
    </div>
  )
}

export default Layout