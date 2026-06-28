"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "./StarRating";

interface ReviewFormProps {
  institutionId: string;
  onSubmit?: () => void;
}

export function ReviewForm({ institutionId, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) return;

    setLoading(true);
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          institution_id: institutionId,
          user_id: "current-user-id",
          rating,
          title,
          content,
        }),
      });

      if (response.ok) {
        setRating(0);
        setTitle("");
        setContent("");
        onSubmit?.();
      }
    } catch (error: any) {
      console.error("Review submission failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-black border border-gold-900/30 rounded-lg p-6 space-y-4">
      <h3 className="text-white font-semibold">Write a Review</h3>
      <div>
        <label className="text-sm text-gray-400 block mb-2">Your Rating</label>
        <StarRating rating={rating} interactive onRatingChange={setRating} />
      </div>
      <div>
        <label className="text-sm text-gray-400 block mb-2">Title (optional)</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Summarize your experience" className="bg-gold-950/30 border-gold-900/30 text-white" />
      </div>
      <div>
        <label className="text-sm text-gray-400 block mb-2">Your Review</label>
        <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Share your experience..." rows={4} required className="bg-gold-950/30 border-gold-900/30 text-white" />
      </div>
      <Button type="submit" disabled={loading || rating === 0} className="w-full">
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
