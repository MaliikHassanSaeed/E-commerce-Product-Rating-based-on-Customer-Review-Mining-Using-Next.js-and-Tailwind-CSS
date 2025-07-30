import { NextRequest, NextResponse } from "next/server";
import { QueryResultRow, sql } from "@vercel/postgres";
import { getProducts } from "../../../sanity/sanity-utils";
import { z } from "zod";

// Define query params schema
const querySchema = z.object({
  category: z.string().optional(),
  brand: z.string().optional(),
  filter: z
    .enum(["Excellent", "Very Good", "Good", "Below Average", ""])
    .optional(),
});

// Define product interface with average rating, total review count, and sentiment counts
interface ProductWithRating {
  _id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  images: string;
  average: number;
  totalReviewCount: number;
  positiveSentimentCount: number;
  negativeSentimentCount: number;
}

export const GET = async (request: NextRequest) => {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const parsed = querySchema.safeParse({
      category: searchParams.get("category"),
      brand: searchParams.get("brand"),
      filter: searchParams.get("filter"),
    });
    console.log("🚀 ~ GET ~ searchParams:", searchParams);
    console.log("🚀 ~ GET ~ parsed:", parsed);

    if (!parsed.success) {
      return NextResponse.json({
        status: 400,
        // error: parsed.error.errors,
      });
    }

    const { category, brand, filter } = parsed.data;
    console.log("🚀 ~ GET ~ filter:", filter);

    // Fetch average ratings, review counts, and sentiment counts from Postgres using raw SQL
    const { rows: reviewData } = await sql`
      SELECT 
        product_id, 
        AVG(rating) AS avg_rating, 
        COUNT(*) AS review_count,
        SUM(CASE WHEN sentiment = 'Positive' THEN 1 ELSE 0 END) AS positive_sentiment_count,
        SUM(CASE WHEN sentiment = 'Negative' THEN 1 ELSE 0 END) AS negative_sentiment_count
      FROM reviews
      GROUP BY product_id
    `;

    // Create a map of productId to average rating, review count, and sentiment counts
    // Initialize all products with default values, then update with review data
    const ratingMap = new Map<
      string,
      {
        average: number;
        totalReviewCount: number;
        positiveSentimentCount: number;
        negativeSentimentCount: number;
      }
    >();
    // Initialize with default values (0) for all products
    const products = await getProducts({ category, brand });
    products.forEach((product: any) => {
      ratingMap.set(product._id, {
        average: 0,
        totalReviewCount: 0,
        positiveSentimentCount: 0,
        negativeSentimentCount: 0,
      });
    });
    // Update with actual review data
    reviewData.forEach((row: QueryResultRow) => {
      ratingMap.set(row.product_id, {
        average: row.avg_rating || 0,
        totalReviewCount: row.review_count || 0,
        positiveSentimentCount: row.positive_sentiment_count || 0,
        negativeSentimentCount: row.negative_sentiment_count || 0,
      });
    });

    // Combine products with ratings and sentiment counts
    let productsWithRatings: ProductWithRating[] = products.map(
      (product: any) => ({
        ...product,
        average: ratingMap.get(product._id)?.average || 0,
        totalReviewCount: ratingMap.get(product._id)?.totalReviewCount || 0,
        positiveSentimentCount:
          ratingMap.get(product._id)?.positiveSentimentCount || 0,
        negativeSentimentCount:
          ratingMap.get(product._id)?.negativeSentimentCount || 0,
      })
    );
    console.log("Filter=>", filter);
    // Filter products based on positive-to-negative sentiment ratio when filter is applied
    if (filter) {
      productsWithRatings = productsWithRatings.filter((product) => {
        const totalSentiments =
          Number(product.positiveSentimentCount) +
          Number(product.negativeSentimentCount);
        if (totalSentiments === 0) return false; // Exclude products with no reviews when filter is applied
        const positiveRatio = product.positiveSentimentCount / totalSentiments;
        console.log(
          `${product.name}=>${totalSentiments}=total||${product.positiveSentimentCount}=positive|${positiveRatio}=Positive Ratio`
        );
        switch (filter) {
          case "Excellent":
            return positiveRatio > 0.8;
          case "Very Good":
            return positiveRatio >= 0.6 && positiveRatio <= 0.8;
          case "Good":
            return positiveRatio >= 0.4 && positiveRatio <= 0.6;
          case "Below Average":
            return positiveRatio < 0.4;
          default:
            return true;
        }
      });
    }
    console.log(productsWithRatings);

    // Sort by positive sentiment count (descending), then by average rating, with zero positive sentiments (no reviews) at the end
    productsWithRatings.sort((a, b) => {
      const aHasReviews =
        a.positiveSentimentCount + a.negativeSentimentCount > 0;
      const bHasReviews =
        b.positiveSentimentCount + b.negativeSentimentCount > 0;

      if (!aHasReviews && !bHasReviews) return 0; // Both have no reviews, keep order
      if (!aHasReviews) return 1; // No reviews for a, place at end
      if (!bHasReviews) return -1; // No reviews for b, place at end

      if (a.positiveSentimentCount === b.positiveSentimentCount) {
        // If positive sentiment counts are equal, sort by average rating
        if (a.average === 0 && b.average === 0) return 0;
        if (a.average === 0) return 1;
        if (b.average === 0) return -1;
        return b.average - a.average;
      }

      return b.positiveSentimentCount - a.positiveSentimentCount;
    });

    return NextResponse.json({
      status: 200,
      data: productsWithRatings,
    });
  } catch (error) {
    console.error("Error fetching products:", (error as Error).message);
    return NextResponse.json({
      status: 500,
      error: "Failed to fetch products || " + (error as Error).message,
    });
  }
};
