import { Loader2, X } from 'lucide-react'
import React, { useState } from 'react'
import { CategoryStore } from '../store/categoryStore'



function AddCategoryComponent({parentId}) {
    const {createCategory, loading} = CategoryStore()

    const handleParentCategory = async (data) => {
        try {
            await createCategory({
                name: data.categoryName,
                description: data.categoryDescription,
                parentId: parentId ? parentId : null
            })
        } catch (error) {
            console.log(error)
        }
    }


    const [data, setData] = useState({
        categoryName: "",
        categoryDescription: "",
        parentId: null,
    })
  


    return (
        <div className='w-96 h-fit flex flex-col justify-center bg-neutral-100 p-4 rounded-2xl'>
            <form onSubmit={(e) => e.preventDefault()} className='flex flex-col  gap-5'>
            <div>
                <div>Category Name</div>
                <label className="floating-label">
                    <span>Category Name</span>
                    <input required type="text" placeholder="Enter the category Name" className="input input-md " onChange={(e) => {
                        setData((prev) => ({
                            ...prev,
                            categoryName: e.target.value,
                        }))
                    }} />
                </label>
            </div>
            <div>
                <div>Category Description</div>
                <label className="floating-label">
                    <span>Category Description</span>
                    <input type="text" placeholder="Enter the category Description(optional)" className="input input-md " onChange={(e) => {
                        setData((prev) => ({
                            ...prev,
                            categoryDescription: e.target.value,
                        }))
                    }} />
                </label>
            </div>
            <button type = "submit" disabled={data.categoryName.length <= 0 || loading} className='btn' onClick={() => handleParentCategory(data)}>{loading ? <Loader2 className='animate-spin' />: "Add"}</button>
            </form>
        </div>
    )
}

export default AddCategoryComponent