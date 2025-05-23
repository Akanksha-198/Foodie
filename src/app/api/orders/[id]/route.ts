import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT =async (req:NextRequest,{params}:{params:{id:string}})=>{
  const {id}=params;
  try{
    const body= await req.json()
    await prisma.order.update({
      where:{
        id:id
      },
      data:{status:body},
      });
      return new NextResponse(
        JSON.stringify({message:"Updated successfully"}),{status:200}
      );


  }catch(e){
    return new NextResponse(
      JSON.stringify({message:"Somethig went wrong"}),{status:500}
    );

  }
};