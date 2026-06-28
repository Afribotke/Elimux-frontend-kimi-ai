"use client";

import { useState, useEffect } from "react";
import { ReviewCard } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";
import { StarRating } from "./StarRating";

interface ReviewsListProps {
  institutionId: string;
}

export function ReviewsList({ institutionId }: ReviewsListProps) {
  interface Review {
    id: string;
    rating: number;
    comment: string;
    author: string;
    date: string;
    created_at: string;
    title: string;
    content: string;
    users?: { full_name: string };
  }

  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  async function fetchReviews() {
    try {
      const response = await fetch(`/api/reviews/institution/${institutionId}`);
      const data = await response.json();
      setReviews(data.reviews || []);
      setAverageRating(data.averageRating || 0);
      setTotal(data.total || 0);
    } catch (error: any) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReviews();
  }, [institutionId]);

  if (loading) return <p className="text-gray-400">Loading reviews...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Reviews</h2>
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={Math.round(averageRating)} />
            <span className="text-white font-semibold">{averageRating}</span>
            <span className="text-gray-500">({total} reviews)</span>
          </div>
        </div>
      </div>

      <ReviewForm institutionId={institutionId} onSubmit={fetchReviews} />

      {reviews.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}
