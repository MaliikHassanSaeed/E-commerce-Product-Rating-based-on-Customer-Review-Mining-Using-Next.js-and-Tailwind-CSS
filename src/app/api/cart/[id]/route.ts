import { sql } from "@vercel/postgres";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { cart } from "@/lib/drizzle";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const db = drizzle(sql);
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({
        status: 401,
        data: "You are unauthorized user.!",
      });
    const resp = await db.delete(cart).where(eq(cart._id, Number(params.id)));
    console.log("🚀 ~ file: route.ts:28 ~ resp:", resp);
    if (resp.rowCount) {
      return NextResponse.json({
        status: 200,
        data: "Successfully deleted a product from cart!",
      });
    }
    return NextResponse.json({
      status: 200,
      data: "The product is already removed from your cart!",
    });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:40 ~ error:", error);
    return NextResponse.json({ status: 500, error: error });
  }
};
