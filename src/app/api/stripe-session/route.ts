import { cart } from "@/lib/drizzle";
import { urlFor } from "@/sanity/sanity-utils";
import { sql } from "@vercel/postgres";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(key, {
  apiVersion: "2022-11-15",
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);
  try {
    if (body.length > 0) {
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1NLVnkDW2P1uB9J0xXS6TI7v" },
          { shipping_rate: "shr_1NLVpwDW2P1uB9J0VKL9UXJM" },
        ],
        invoice_creation: {
          enabled: true,
        },
        line_items: body.map((item: any) => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                // images: urlFor(item.images).url(),
              },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity,
          };
        }),
        phone_number_collection: {
          enabled: true,
        },
        success_url: `${request.headers.get("origin")}/success`,
        cancel_url: `${request.headers.get("origin")}/?canceled=true`,
      });
      const { userId } = auth();
      if (!userId) return;

      const db = drizzle(sql);
      const resp = await db.delete(cart).where(eq(cart.user_id, userId));

      return NextResponse.json({ session });
    } else {
      return NextResponse.json({ message: "No Data Found" });
    }
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(err.message);
  }
}
