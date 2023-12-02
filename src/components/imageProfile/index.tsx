import { useState } from "react";

export function ImageProfile({ selectedImage }: { selectedImage: File | null }){

  const imageSrc = selectedImage
    ? URL.createObjectURL(selectedImage)
    : "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80";

  return(
    <>
      <img
        className="h-80 w-80 rounded-full object-cover object-center"
        src={imageSrc}
        alt="profile image"
      />
    </>
  )
}