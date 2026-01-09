import { Loader, Loader2, Minus, Plus, RefreshCcw, X } from 'lucide-react'
import React, { Children, useEffect, useState } from 'react'
import { CategoryStore } from '../store/categoryStore'
import AddCategoryComponent from './AddCategoryComponent'
import InventoryComponent from './InventoryComponent'
import { productStore } from '../store/productStore'
import { ImageUploadComponent } from './ImageUploadComponent'


function AddProductComponent({ closeComponent }) {
  const { dividedCategories, getDividedCategories, categoryUpadted } = CategoryStore()
  const { createProduct, isCreatingProduct } = productStore()
  const { stocks } = productStore()
  const [openParentCategoryModal, setOpenParentCategoryModal] = useState(false)
  const [openChildrenCategoryModal, setOpenChildrenCategoryModal] = useState(false)
  useEffect(() => {
    getDividedCategories()


  }, [categoryUpadted])


  console.log("bhaiyoo stoks", stocks)

  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productPrice: 0,
    productType: "",
    productColour: "",

  })
  const [parentId, setParentId] = useState(null)
  const [childId, setChildId] = useState(null)

  const [uploadedData, setUploadedData] = useState({
    mainImage: null,
    subImages: [],
  })

  // console.log(formData)
  const handleCreate = async () => {
    try {
      const data = {
        name: formData.productName,
        description: formData.productDescription,
        price: +(formData.productPrice),
        type: formData.productType,
        colour: formData.productColour,
        categoryId: childId,
        mainImage: uploadedData.mainImage,
        subImage: uploadedData.subImages,
        stocks: stocks
      }
      console.log(data)
      await createProduct(data)
    } catch (error) {
      console.log(error)
    }
  }


  return (

    <div className='bg-white w-[50%] h-full rounded-xl shadow-lg overflow-auto flex flex-col items-center px-4'>
      <div className='flex justify-between p-2 w-full'>
        <span>Add Product</span>
        <span onClick={() => closeComponent(false)} className='cursor-pointer'><X /></span>
      </div>
      <div>

        <div className='flex flex-col gap-y-4 mb-12'>
          <div>
            <div>Product Name</div>
            <label className="floating-label">
              <span>Product Name</span>
              <input type="text" placeholder="Enter the product Name" className="input input-md " onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  productName: e.target.value,
                }))
              }} />
            </label>
          </div>
          <div>
            <div>Product Description</div>
            <label className="floating-label">
              <span>Product Description</span>
              <input type="text" placeholder="Enter the product Description" className="input input-md " onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  productDescription: e.target.value,
                }))
              }} />
            </label>
          </div>
          <div>
            <div>Product price</div>
            <label className="floating-label">
              <span>Product Price</span>
              <input type="number" placeholder="price eg: 500" className="input input-md " onChange={(e) => {
                setFormData((prev) => ({ ...prev, productPrice: e.target.value }))
              }} />
            </label>
          </div>
          <div>
            <div>Product Type</div>
            <label className="floating-label">
              <span>Product Type</span>
              <input type="text" placeholder="Enter the product Name" className="input input-md " onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  productType: e.target.value,
                }))
              }} />
            </label>
          </div>
          <div>
            <div>Product Colour</div>
            <label className="floating-label">
              <span>Product Colour</span>
              <input type="text" placeholder="Enter the product Name" className="input input-md " onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  productColour: e.target.value,
                }))
              }} />
            </label>
          </div>
        </div>



        {/* parent category data */}
        <div className=''>

          <div className='flex gap-24 items-center mb-4'>
            <span>Parent Category</span>
            <button className='btn' onClick={() => (setOpenParentCategoryModal((prev) => !prev))}>{openParentCategoryModal ? <Minus /> : <Plus />}</button>
          </div>
          {openParentCategoryModal ? <AddCategoryComponent /> : ""}
          {dividedCategories ? (<div className='flex gap-4 flex-wrap w-[70%]'>
            <div className='filter'>
              <input className="btn filter-reset m-1" type="radio" name="metaframeworks" aria-label="All" onClick={(e) => {
                setParentId(null)
              }} />
              {dividedCategories.parents.map((elem) => (<input key={elem.id} className="btn" type="radio" name="metaframeworks" aria-label={elem.name} onClick={(e) => {
                
                setParentId(elem.id)
              }} />))}
              <button className='btn' onClick={(e) => {
                getDividedCategories()
              }}><RefreshCcw /></button>
            </div>
            {/* <button className='btn'>Add Category</button> */}
          </div>) : <span><Loader2 className='animate-spin' /></span>}


        </div>

        {/* {Children category data } */}

        {parentId && <div className=''>

          <div className='flex gap-24 items-center my-4'>
            <span>Children Category</span>
            <button className='btn' onClick={() => (setOpenChildrenCategoryModal((prev) => !prev))}>{openChildrenCategoryModal ? <Minus /> : <Plus />}</button>
          </div>
          {openChildrenCategoryModal ? <AddCategoryComponent parentId={parentId} /> : ""}
          {console.log("hello hello", dividedCategories)}
          {dividedCategories ? (<div className='flex gap-4 flex-wrap w-[70%]'>
            <div className='filter'>
              <input className="btn filter-reset" type="radio" name="metaframeworks" aria-label="All"
                onClick={(e) => {
                  setChildId(null)
                }} />

              {dividedCategories.children.filter((elem) => elem.parentId === parentId).map((elem) => (<input key={elem.id} className="btn" type="radio" name="metaframeworks" aria-label={elem.name} onClick={(e) => {
                setChildId(elem.id)
              }} />))}
              <button className='btn' onClick={(e) => {
                getDividedCategories()
              }}><RefreshCcw /></button>

            </div>
            {/* <button className='btn'>Add Category</button> */}
          </div>) : <span><Loader2 className='animate-spin' /></span>}


        </div>}



        {/* inventory management */}
        <InventoryComponent />

        {/* image  upload */}
        <ImageUploadComponent setUploadedData={setUploadedData} />


        <div className=' w-full flex justify-center items-center'>
          <button className='btn btn-soft btn-info my-4' onClick={handleCreate}>Add product</button>
        </div>





      </div>
    </div>
  )
}

export default AddProductComponent