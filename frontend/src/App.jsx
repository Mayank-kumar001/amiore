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
import OrderSuccessful from './pages/OrderSuccesfull'
import AdminPage from './pages/AdminPage'
import AboutPage from './pages/AboutPage'
import JournalPage from './pages/JournalPage'
import ContactPage from './pages/ContactPage'
import StoresPage from './pages/StoresPage'
import SizeGuidesPage from './pages/SizeGuidesPage'
import DeliveryPage from './pages/DeliveryPage'
import ReturnsPage from './pages/ReturnsPage'
import VIPPage from './pages/VIPPage'
import FAQPage from './pages/FAQPage'
import CareersPage from './pages/CareersPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
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


    <div className='min-h-screen mt-6'>
      <Toaster position="bottom-right" reverseOrder={false} />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/' element={<Layout />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/product/:productId' element={<IndivisualProjectPage />} />
          <Route path='/products/:parentId' element={<Product />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/orderSucessful/:orderId' element={<OrderSuccessful />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/journal' element={<JournalPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/stores' element={<StoresPage />} />
          <Route path='/size-guides' element={<SizeGuidesPage />} />
          <Route path='/delivery' element={<DeliveryPage />} />
          <Route path='/returns' element={<ReturnsPage />} />
          <Route path='/vip' element={<VIPPage />} />
          <Route path='/faq' element={<FAQPage />} />
          <Route path='/careers' element={<CareersPage />} />
          <Route path='/terms' element={<TermsPage />} />
          <Route path='/privacy' element={<PrivacyPage />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App