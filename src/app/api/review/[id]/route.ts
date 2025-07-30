import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

// Define params schema
const paramsSchema = z.object({
  id: z.string().regex(/^\d+$/, "Review ID must be a numeric value"),
});

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    // Validate params
    const parsed = paramsSchema.safeParse(params);
    if (!parsed.success) {
      return NextResponse.json({
        status: 400,
        error: "Invalid review ID format",
      });
    }

    const { id } = parsed.data;

    // Check authentication
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({
        status: 401,
        error: "Unauthorized",
      });
    }

    // Fetch the review to verify ownership
    const { rows: reviews } = await sql`
      SELECT user_id
      FROM reviews
      WHERE id = ${id}
    `;

    if (reviews.length === 0) {
      return NextResponse.json({
        status: 404,
        error: "Review not found",
      });
    }

    if (reviews[0].user_id !== userId) {
      return NextResponse.json({
        status: 403,
        error: "You are not authorized to delete this review",
      });
    }

    // Delete the review
    const { rowCount } = await sql`
      DELETE FROM reviews
      WHERE id = ${id}
    `;

    if (rowCount === 0) {
      return NextResponse.json({
        status: 404,
        error: "Review not found",
      });
    }

    return NextResponse.json({
      status: 200,
      data: { message: "Review deleted successfully" },
    });
  } catch (error) {
    console.error("Error deleting review:", (error as Error).message);
    return NextResponse.json({
      status: 500,
      error: "Failed to delete review",
      message: error.message,
    });
  }
};
