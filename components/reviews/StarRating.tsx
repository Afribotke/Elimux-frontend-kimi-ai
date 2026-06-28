"use client";

import { Star } from "lucide-react";

export function StarRating({ rating, maxRating = 5, size = 20, interactive = false, onRatingChange }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: maxRating }, (_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= rating;
        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRatingChange?.(starValue)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <Star size={size} className={`${isFilled ? 'fill-gold-500 text-gold-500' : 'text-gray-400'}`} />
          </button>
        );
      })}
    </div>
  );
}
