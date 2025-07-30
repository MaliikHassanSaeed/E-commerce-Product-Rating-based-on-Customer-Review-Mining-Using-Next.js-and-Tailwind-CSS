"use client";

import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import axios from "axios";

interface Review {
  id: number;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  user?: {
    fullName?: string;
    profilePic?: string;
  };
}

interface ProductReviewsDisplayProps {
  productId: string;
  reviews: Review[];
}

const ProductReviewsDisplay: React.FC<ProductReviewsDisplayProps> = ({
  productId,
  reviews,
}) => {
  console.log("🚀 ~ reviews:", reviews);
  const { isSignedIn, userId } = useAuth();
  console.log("🚀 ~ isSignedIn:", isSignedIn);

  const handleDelete = async (reviewId: number) => {
    // Implement delete logic here (e.g., API call to delete the review)
    try {
      console.log(`Delete review with ID: ${reviewId}`);
      const resp = await axios.delete(`/api/review/${reviewId}`);
      console.log("🚀 ~ handleDelete ~ resp:", resp);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4">Product Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet for this product.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, i) => (
            <div key={i} className="p-4 border rounded-md bg-gray-50 relative">
              <div className="flex items-center mb-2">
                <div className="flex w-full justify-between items-center">
                  <div className="flex justify-start gap-x-3">
                    <Image
                      src={review.user?.profilePic || "/default-profile.png"}
                      alt={review.user?.fullName || "User"}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <span className="ml-2 text-sm text-gray-500">
                      {review.user?.fullName || "Anonymous"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-xl ${
                          star <= review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
              {isSignedIn && userId === review.userId && (
                <button
                  onClick={() => handleDelete(review.id)}
                  className="absolute bottom-2 right-2 text-red-500 hover:text-red-700"
                  aria-label="Delete review"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReviewsDisplay;
