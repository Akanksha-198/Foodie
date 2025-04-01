import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
//fetching single product  by product id 
export const GET =async (req:NextRequest,{params}:{params:{id:string}})=>{
  const {id}=params;
  try{
    const product=await prisma.product.findUnique({
      where:{
        id:id
      },
      });
      return new NextResponse(
        JSON.stringify(product),
        {status:200}
      );


  }catch(e){
    return new NextResponse(
      JSON.stringify({message:"Somethig went wrong"}),{status:500}
    );

  }
};

//Delete single product  by product id
export const DELETE =async (req:NextRequest,{params}:{params:{id:string}})=>{
  const {id}=params;
  const session=await getAuthSession();
  if(session?.user.isAdmin){
    try{
        await prisma.product.delete({
          where:{
            id:id
          },
        });
        return new NextResponse(
          JSON.stringify({message:"Product deleted successfully"}),{status:200}
        );
  
  
    }catch(e){
      return new NextResponse(
        JSON.stringify({message:"Product not deleted "}),{status:500}
      );
  
    }
  }
  return new NextResponse(
    JSON.stringify({message:"Somethig went wrong"}),{status:403}
  );

};