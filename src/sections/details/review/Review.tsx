"use client";
import { errToast } from "@/utils/toasts";
import { useState, FormEvent } from "react";
import toast from "react-hot-toast";

interface ReviewFormProps {
  productId: string;
  //   onSubmit: (review: {
  //     productId: string;
  //     rating: number;
  //     comment: string;
  //   }) => Promise<void>;
}

const ProductReviewForm: React.FC<ReviewFormProps> = ({
  productId,
  //   onSubmit,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoader(true);
      console.log({ rating, comment, productId });
      const response = await fetch("/api/add-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment, productId }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.msg || "Failed to submit review");
      }
      console.log(response);
      const respJson = await response.json();
      console.log(respJson);
    } catch (error: any) {
      console.log(error.message);
      errToast(error.message);
    } finally {
      setRating(0);
      setComment("");
      setLoader(false);
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Write a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Comment
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            rows={4}
            placeholder="Share your thoughts about the product..."
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          disabled={loader}
        >
          {loader ? "Loading...." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ProductReviewForm;