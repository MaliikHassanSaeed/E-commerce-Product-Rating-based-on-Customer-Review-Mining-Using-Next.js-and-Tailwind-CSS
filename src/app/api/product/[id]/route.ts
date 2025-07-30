import { clerkClient } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { reviews } from "../../../../lib/drizzle";
import { fetchSingleProduct } from "../../../../sanity/sanity-utils";

// Define review interface
interface Review {
  _id: number;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  user?: {
    fullName?: string;
    username?: string;
  };
}

// Validate URL parameter
const paramsSchema = z.object({
  id: z.string().min(1, "Product ID is required"),
});

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    // Validate params
    const parsed = paramsSchema.safeParse(params);
    if (!parsed.success) {
      return NextResponse.json({
        status: 400,
        // error: parsed.error.errors,
      });
    }

    const { id } = parsed.data;

    // Fetch product from Sanity
    const product = await fetchSingleProduct(id);
    if (!product) {
      return NextResponse.json({
        status: 404,
        error: "Product not found",
      });
    }

    // Fetch reviews from Postgres
    const db = drizzle(sql);

    const result = await db
      .select()
      .from(reviews)
      .where(eq(reviews.productId, id))
      .orderBy(reviews.id);

    console.log("🚀 ~ result:", result);
    const fetchedReviews = result.map((row) => ({
      id: row.id,
      productId: row.productId,
      userId: row.userId,
      rating: row.rating,
      comment: row.comment,
    }));

    // Fetch user details from Clerk
    const userIds = Array.from(new Set(fetchedReviews.map((review) => review.userId)));
    const users = await clerkClient.users.getUserList({ userId: userIds });

    console.log("🚀 ~ users:", users[0]);
    // Map user data to reviews
    const enrichedReviews = fetchedReviews.map((review) => {
      const user = users.find((u) => u.id === review.userId);
      return {
        ...review,
        user: user
          ? {
              fullName: user.firstName ? `${user.firstName}` : undefined,
              profilePic: user.imageUrl,
            }
          : undefined,
      };
    });

    // Return product and reviews
    return NextResponse.json({
      status: 200,
      data: {
        product,
        reviews: enrichedReviews,
      },
    });
  } catch (error: any) {
    console.error("Error fetching product and reviews:", error.message);
    return NextResponse.json({
      status: 500,
      error: "Failed to fetch product and reviews",
    });
  }
};
