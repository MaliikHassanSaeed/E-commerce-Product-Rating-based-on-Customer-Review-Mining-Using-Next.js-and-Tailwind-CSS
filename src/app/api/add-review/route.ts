import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { reviews } from "../../../lib/drizzle";
import { z } from "zod";

// Input validation schema
const reviewSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  rating: z.number().int().min(1).max(5, "Rating must be between 1 and 5"),
  comment: z
    .string()
    .min(1, "Comment is required")
    .max(1000, "Comment is too long"),
});

export const POST = async (request: NextRequest) => {
  try {
    const db = drizzle(sql, {
      // Explicitly configure connection options to avoid SSL conflicts
      // connection: {
      //   ssl: false, // Let Neon handle SSL automatically
      // },
    });
    const req = await request.json();

    // Validate input
    const parsed = reviewSchema.safeParse(req);
    if (!parsed.success) {
      return NextResponse.json({
        status: 400,
        // error: parsed.error.errors,
      });
    }

    const { productId, rating, comment } = parsed.data;

    // Check authentication
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({
        status: 401,
        error: "You are not logged in.",
      });
    }

    // Check for existing review by user for this product
    // const existingReview = await db
    //   .select()
    //   .from(reviews)
    //   .where(and(eq(reviews.productId, productId), eq(reviews.userId, userId)));

    // if (existingReview[0]) {
    //   return NextResponse.json({
    //     status: 400,
    //     data: existingReview,
    //     msg: "You have already reviewed this product.",
    //   });
    // }

    // Make call to FastAPI server for sentiment analysis
    const sentimentResponse = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ review: comment }),
    });

    if (!sentimentResponse.ok) {
      throw new Error("Failed to fetch sentiment from FastAPI server");
    }

    const { sentiment } = await sentimentResponse.json();

    // Insert new review with sentiment
    const resp = await db
      .insert(reviews)
      .values({
        productId,
        userId,
        rating,
        comment,
        sentiment, // Store the sentiment from FastAPI response
      })
      .returning();

    return NextResponse.json({ status: 201, data: resp[0] });
  } catch (error) {
    console.error("Error saving review:", error);
    return NextResponse.json({ status: 500, error: "Failed to save review" });
  }
};
