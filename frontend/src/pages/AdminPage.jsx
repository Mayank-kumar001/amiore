import {
	ImageKitAbortError,
	ImageKitInvalidRequestError,
	ImageKitServerError,
	ImageKitUploadNetworkError,
	upload,
} from "@imagekit/react";
import { useRef, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import AddProductComponent from "../components/AddProductComponent";




function AdminPage() {
	


	const [addProductPageOpen, setAddProductPageOpen] = useState(false);

	return(
		<div className="min-h-screen flex justify-center relative overflow-hidden">
			{/* <div className="bg-black  w-full" >
		hello
			</div> */}
			{addProductPageOpen &&<div className='min-h-screen absolute inset-0 flex h-full w-full items-center justify-center bg-black/50 overflow-hidden p-4'>
			 <AddProductComponent closeComponent={setAddProductPageOpen} />
			</div>}
			<div className="flex justify-end h-fit w-full p-4">
			<button className="btn " onClick={() => setAddProductPageOpen(true)}>Add Product</button>
			</div>
		</div>
	)
}

export default AdminPage