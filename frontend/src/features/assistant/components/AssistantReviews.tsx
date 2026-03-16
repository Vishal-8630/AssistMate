"use client";

import { Button } from "@/components/ui/button";
import { ReviewCard } from "./ReviewCard";
import { ReviewDto } from "@/features/review/types";
import { Loader } from "@/components/ui/loader";

interface Props {
  reviews: ReviewDto[];
  isLoading?: boolean;
}

export function AssistantReviews({ reviews, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl shadow-sm ring-1 ring-black/5 p-8">
        <Loader text="Loading reviews..." />
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-sm ring-1 ring-black/5 p-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <p className="text-slate-500">
          No reviews yet. Be the first to leave feedback!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Recent Reviews</h2>

        <Button
          variant="ghost"
          className="text-indigo-600 hover:text-indigo-700"
        >
          View all
        </Button>
      </div>

      <div className="space-y-4">
        {reviews.slice(0, 3).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
