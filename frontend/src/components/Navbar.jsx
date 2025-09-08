import React from 'react'
import { ShoppingBag, User } from 'lucide-react'
import { useNavigate } from "react-router"
import { authStore } from '../store/authStore';

function Navbar({setAuthModalOpen, setCartModalOpen}) {
    const navigate = useNavigate();
    const { authState } = authStore();
  return (
    <div className='flex justify-between px-4 py-2'>
        <div>
            <ul className='flex gap-4 items-center'>
                <li><img src="https://www.amiore.in/cdn/shop/files/1_b3934b26-36e5-45d9-a110-0aedea08155b.svg?v=1750272569&width=2000" alt="" width={"80px"} /></li>
                <li>Mens</li>
                <li>Ladies</li>
                <li>Home</li>
            </ul>
        </div>
        <div>
            <ul className='flex gap-6 items-center cursor-pointer'>
                <li onClick={() => {
                    if(authState === "authenticated"){
                        navigate("/profile")
                    }else{
                        setAuthModalOpen(true)
                    }
                }}><User /></li>
                <li><ShoppingBag onClick={()=>{
                    setCartModalOpen(true)
                }} /></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar