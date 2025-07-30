import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs";
import { fetchProductInCart } from "@/sanity/sanity-utils";
import { cart } from "../../../lib/drizzle";

export const POST = async (request: NextRequest) => {
  try {
    const db = drizzle(sql);
    const req = await request.json();
    const { userId } = auth();
    if (!userId) {
      console.log("err");

      NextResponse.json({
        status: 401,
        error: "You are not logged in.",
      });
      return NextResponse.redirect("/signin");
    }
    const chkData = await db
      .select()
      .from(cart)
      .where(
        and(
          eq(cart.product_id, req.product_id),
          eq(cart.color, req.size),
          eq(cart.user_id, userId)
        )
      );
    if (chkData[0]) {
      return NextResponse.json({
        status: 400,
        data: chkData,
        msg: "The product is already in your cart.",
      });
    }
    const resp = await db
      .insert(cart)
      .values({
        product_id: req.product_id,
        user_id: userId,
        color: req.size,
        quantity: req.quantity,
      })
      .returning();
    return NextResponse.json({ status: 200, data: resp });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:55 ~ POST ~ error:", error);
    return NextResponse.json({ status: 500, error });
  }
};
export const PATCH = async (request: NextRequest) => {
  try {
    const req = request.json();
    const db = drizzle(sql);
    const resp = await db
      .update(cart)
      .set({ quantity: 300 })
      .where(eq(cart._id, 1))
      .returning();
    return NextResponse.json({ status: 200, data: resp });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:39 ~ PUT ~ error:", error);
    return NextResponse.json({ status: 500, error: error });
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const db = drizzle(sql);
    const { userId } = auth();
    if (!userId) return;
    const resp = await db.select().from(cart).where(eq(cart.user_id, userId));
    if (resp.length > 0) {
      const ids = resp.map((product, i) => product.product_id);
      const sanityData = await fetchProductInCart(ids);

      if (!sanityData) return;

      const data = resp.map((product) => {
        const sanityProduct = sanityData.find(
          (sanityProduct) => sanityProduct.product_id === product.product_id
        );
        if (sanityProduct) {
          return { ...product, ...sanityProduct };
        }
        return product;
      });
      console.log("🚀 ~ file: route.ts:113 ~ data ~ data:", data);

      return NextResponse.json({ status: 200, data: data });
    }
  } catch (error) {
    console.log("🚀 ~ file: route.ts:99 ~ GET ~ error:", error);
    return NextResponse.json({ status: 500, error: error });
  }
};