"use client";
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React from 'react'
import { RiFunctionAddLine } from 'react-icons/ri'

const AddButton = () => {
  let addCss = "";
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div className='absolute top-8 right-20'>Loading...</div>
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    addCss = "hidden";
    return null;
  } else {
    addCss = "block";
  }

  const handleAdd = async () => {
    router.push("/add");
  }

  return (
    <button 
      className={`  bg-green-500 p-2 rounded-full absolute top-7 right-20 flex cursor-pointer text-white ${addCss}`} 
      onClick={handleAdd}
    >  
      <RiFunctionAddLine size={20} className='text-white mr-2' />
      Add Product
    </button>
  )
}

export default AddButton;