"use client";

import { CiEdit } from "react-icons/ci";
import { OrderType } from "@/types/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const { isPending, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch("http://localhost:3000/api/orders").then((res) => res.json()),
  });

  const queryClient =useQueryClient();

  const mutation=useMutation({
    mutationFn:({id,status}:{id:string;status:string})=>{
      return fetch(`http://localhost:3000/api/orders/${id}`,{
        method:"PUT",
        headers:{
          "content-type":"application/json",
        },
        body:JSON.stringify(status),
        }); 
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["orders"]});
    },
  });

  
  const handleUpdate=(e:React.FormEvent<HTMLFormElement>,id:string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const status = input.value;

    mutation.mutate({id,status});
    toast.success("The order status has been changed.");

  };
  if (isPending || status === "loading") return <p>Loading...</p>;
  if (error) return <p>Error loading orders</p>;


  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: OrderType) => (
            <tr key={item.id} className={`${item.status!=="delivered"&&"bg-green-100"}`} >
              <td className="hidden md:block py-6 px-3 rounded-md">{item.id}</td>
              <td className="py-6 px-3 rounded-md">{item.createdAt.toString().slice(0,10)}</td>
              <td className="py-6 px-3 rounded-md">{item.price}</td>
              <td className="hidden md:block py-6 px-3 rounded-md">{item.products[0].title}</td>
              {session?.user.isAdmin ?(
                <td>
                  <form className="flex items-center justify-center gap-4" onSubmit={(e) =>handleUpdate(e,item.id)}>
                    <input placeholder={item.status} className="p-2  ring-1 ring-red-100 rounded-md"/>
                    <button className="bg-green-500 p-2 rounded-full" >
                    <CiEdit   size={25} className=" text-white"/>

                    </button>
                  </form>
                </td>
              ):(
                <td className="py-6 px-1">{item.status}</td>
              )}
            </tr>
           
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
