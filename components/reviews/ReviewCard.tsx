"use client";

import { StarRating } from "./StarRating";

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

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-black border border-gold-900/30 rounded-lg p-6 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gold-600 rounded-full flex items-center justify-center text-black font-bold">
            {review.users?.full_name?.charAt(0) || "U"}
          </div>
          <div>
            <p className="text-white font-medium">{review.users?.full_name || "Anonymous"}</p>
            <p className="text-xs text-gray-500">{new Date(review.created_at).toLocaleDateString()}</p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>
      {review.title && <h4 className="text-white font-semibold">{review.title}</h4>}
      <p className="text-gray-400 text-sm leading-relaxed">{review.content}</p>
    </div>
  );
}
