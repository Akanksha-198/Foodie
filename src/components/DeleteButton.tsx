"use client";
import { Param } from '@prisma/client/runtime/library';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from 'react-toastify';

const DeleteButton = ({id}:{id:string}) => {
  const {data:session,status}=useSession();
  const router =useRouter();
  if(status==="loading"){
    return <div>Loading...</div>
  }
  if(status==="unauthenticated"||!session?.user.isAdmin){
    return ;
  }
  const handleDelete=async()=>{
    const res=await fetch(`http://localhost:3000/api/products/${id}`,{
      method:"DELETE",
    });
    if(res.status===200){
      router.push("/menu");
      toast("The product has been deleted.");
    }else{
      const data=await res.json();
      toast.error(data.message);  
    }
    
  }
  return (
    <button className="bg-green-500 p-2 rounded-full absolute top-10 right-20 cursor-pointer" onClick={handleDelete}>
      <RiDeleteBinLine   size={30} className='text-white'/>
    </button>
  )
}

export default DeleteButton
