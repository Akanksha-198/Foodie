import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// Fetch all orders
export const GET = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "You are not authenticated" }),
      { status: 401 }
    );
  }

  try {
    if (session.user.isAdmin) {
      const orders = await prisma.order.findMany(); 
      return new NextResponse(JSON.stringify(orders), { status: 200 });
    }

    const userOrders = await prisma.order.findMany({
      where: {
        userEmail: session.user.email!,
      }
    });

    return new NextResponse(JSON.stringify(userOrders), { status: 200 }); 
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};
