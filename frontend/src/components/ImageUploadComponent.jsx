import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
// import { useRef, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";

import { useState } from "react"
import { imagekitAuthenticator } from "../utils/imagekitAuthenticator";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export function ImageUploadComponent({setUploadedData}) {
  const [mainImage, setMainImage] = useState(null)
  const [mainImageUploading, setMainImageUploading] = useState(false)
  const [subImageUploading, setSubImageUploading] = useState(false)
  const [galleryImages, setGalleryImages] = useState([])
  

  const handleUpload = async () => {
    try {
      setMainImageUploading(true)
      console.log(mainImage)
      // Access the file input element using the ref
      const fileInput = mainImage;
      if (!fileInput || !fileInput.file || fileInput.file.length === 0) {
        alert("Please select a file to upload");
        return;
      }
  
      // Extract the first file from the file input
      const file = fileInput.file;
  
      // Retrieve authentication parameters for the upload.
      let authParams;
      try {
        authParams = await imagekitAuthenticator();
      } catch (authError) {
        console.error("Failed to authenticate for upload:", authError);
        return;
      }
      const { signature, expire, token, publicKey } = authParams;
  
      // Call the ImageKit SDK upload function with the required parameters and callbacks.
      try {
        
        
        const uploadResponse = await upload({
          // Authentication parameters
          expire,
          token,
          signature,
          publicKey,
          file,
          fileName: file.name, // Optionally set a custom file name
          // Progress callback to update upload progress state
          // onProgress: (event) => {
          //     setProgress((event.loaded / event.total) * 100);
          // },
          // Abort signal to allow cancellation of the upload if needed.
          // abortSignal: abortController.signal,
        });
        console.log("Upload response:", uploadResponse);
        setUploadedData((prevData) => ({
          ...prevData,
          mainImage: uploadResponse.url
        }))
        setMainImageUploading(false)
        toast.success("Image uploaded successfully!")
        
      } catch (error) {
        // Handle specific error types provided by the ImageKit SDK.
        if (error instanceof ImageKitAbortError) {
          console.error("Upload aborted:", error.reason);
        } else if (error instanceof ImageKitInvalidRequestError) {
          console.error("Invalid request:", error.message);
        } else if (error instanceof ImageKitUploadNetworkError) {
          console.error("Network error:", error.message);
        } else if (error instanceof ImageKitServerError) {
          console.error("Server error:", error.message);
        } else {
          // Handle any other errors that may occur.
          console.error("Upload error:", error);
        }
      }
    } catch (error) {
      
    }finally{
      setMainImageUploading(false)
    }
  };
  const handleSubImageUpload = async () => {
   try {
    setSubImageUploading(true)
     console.log(galleryImages)
     console.log(galleryImages[0])
     // Access the file input element using the ref
     const fileInput = galleryImages;
     if (!fileInput || fileInput.length === 0) {
       alert("Please select a file to upload");
       return;
     }
 
     // Extract the first file from the file input
     // const file = fileInput.files[0];
 
     // Retrieve authentication parameters for the upload.
     let authParams;
 
 
     // Call the ImageKit SDK upload function with the required parameters and callbacks.
     try {
       const uploads = galleryImages.map(async (file) => {
         try {
           authParams = await imagekitAuthenticator();
         } catch (authError) {
           console.error("Failed to authenticate for upload:", authError);
           return;
         }
         const { signature, expire, token, publicKey } = authParams;
         return await upload({
           expire,
           token,
           signature,
           publicKey,
           file: file.file,
           fileName: file.file.name,
         })
       }
       );
 
       const results = await Promise.all(uploads);
       console.log(results)
       const urls = results.map((res) => res.url);
       setUploadedData((prevData) => ({
         ...prevData,
         subImages: [...urls]
       }))
       toast.success("Image uploaded successfully!")
 
       console.log(urls)
 
       // const uploadResponse = await upload({
       //   // Authentication parameters
       //   expire,
       //   token,
       //   signature,
       //   publicKey,
       //   file,
       //   fileName: file.name, // Optionally set a custom file name
       //   // Progress callback to update upload progress state
       //   // onProgress: (event) => {
       //   //     setProgress((event.loaded / event.total) * 100);
       //   // },
       //   // Abort signal to allow cancellation of the upload if needed.
       //   // abortSignal: abortController.signal,
       // });
       // console.log("Upload response:", uploadResponse);
     } catch (error) {
       // Handle specific error types provided by the ImageKit SDK.
       if (error instanceof ImageKitAbortError) {
         console.error("Upload aborted:", error.reason);
       } else if (error instanceof ImageKitInvalidRequestError) {
         console.error("Invalid request:", error.message);
       } else if (error instanceof ImageKitUploadNetworkError) {
         console.error("Network error:", error.message);
       } else if (error instanceof ImageKitServerError) {
         console.error("Server error:", error.message);
       } else {
         // Handle any other errors that may occur.
         console.error("Upload error:", error);
       }
     }
   } catch (error) {
    
   }finally{
    setSubImageUploading(false)
   }
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setMainImage({
          file,
          preview: reader.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files)

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setGalleryImages((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(7),
            file,
            preview: reader.result,
          },
        ])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeMainImage = () => setMainImage(null)

  const removeGalleryImage = (id) => {
    setGalleryImages((prev) => prev.filter((img) => img.id !== id))
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      {/* Section 1: Main Image Upload */}
      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="bg-primary/5 px-6 py-4 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            Main Image
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Upload a single high-quality image as the primary visual</p>
        </div>

        <div className="p-6">
          {!mainImage ? (
            <label className="flex flex-col items-center justify-center w-full h-72 border-2 border-dashed border-border rounded-lg cursor-pointer bg-secondary/30 hover:bg-secondary/50 transition-all duration-200">
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" x2="12" y1="3" y2="15" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-base font-medium text-foreground">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground mt-1">PNG, JPG or WEBP (recommended: 1200x800px)</p>
                </div>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleMainImageChange} />
            </label>
          ) : (
            <div className="relative group rounded-lg overflow-hidden border border-border bg-muted">
              <img
                src={mainImage.preview || "/placeholder.svg"}
                alt="Main preview"
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <button
                  onClick={removeMainImage}
                  className="px-5 py-2.5 bg-destructive text-destructive-foreground rounded-lg font-medium hover:bg-destructive/90 transition-colors flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                  Remove Image
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <button disabled={mainImageUploading} className="btn" onClick={handleUpload}>{mainImageUploading ? <Loader2 className="animate-spin"/> : "Upload"}</button>


      {/* Section 2: Multiple Photos Upload */}
      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="bg-primary/5 px-6 py-4 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1" />
              <path d="M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1" />
            </svg>
            Photo Gallery
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Select multiple photos to showcase different angles or details
          </p>
        </div>

        <div className="p-6 space-y-6">
          <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-border rounded-lg cursor-pointer bg-secondary/30 hover:bg-secondary/50 transition-all duration-200">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" x2="12" y1="3" y2="15" />
                </svg>
              </div>
              <p className="text-base font-medium text-foreground">Add multiple photos</p>
            </div>
            <input type="file" className="hidden" multiple accept="image/*" onChange={handleGalleryChange} />
          </label>

          {galleryImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {galleryImages.map((img) => (
                <div
                  key={img.id}
                  className="relative group aspect-square rounded-lg overflow-hidden border border-border bg-muted"
                >
                  <img
                    src={img.preview || "/placeholder.svg"}
                    alt="Gallery preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeGalleryImage(img.id)}
                    className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 active:scale-95"
                    aria-label="Remove image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <button disabled={subImageUploading} className="btn" onClick={handleSubImageUpload}>{subImageUploading ? <Loader2 className="animate-spin"/> : "Upload"}</button>

    </div>
  )
}
