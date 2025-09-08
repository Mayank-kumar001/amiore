import React, { useEffect } from 'react'
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import { Toaster } from "react-hot-toast"
import { authStore } from './store/authStore'
import { Loader2 } from 'lucide-react'
import Profile from './pages/Profile'
import Product from './pages/Product'
import Layout from './layouts/Layout'
import IndivisualProjectPage from './pages/IndivisualProjectPage'
import Checkout from './pages/Checkout'
function App() {
  const { checkAuth, isCheckingUserAuth } = authStore()
  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if (isCheckingUserAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }

  return (


    <div className='min-h-screen'>
      <Toaster position="bottom-right" reverseOrder={false} />

      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/product/:productId' element={<IndivisualProjectPage />} />
          <Route path='/products/:categoryId' element={<Product />} />
          <Route path='/checkout' element={<Checkout />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App