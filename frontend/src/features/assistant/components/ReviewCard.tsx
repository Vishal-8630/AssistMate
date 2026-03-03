"use client";

import { Star } from "lucide-react";
import { AssistantReview } from "../types";

interface Props {
  review: AssistantReview;
}

export function ReviewCard({ review }: Props) {
  const formattedDate = new Date(review.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-6">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400">
          {review.reviewerName.slice(0, 2).toUpperCase()}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900">
              {review.reviewerName}
            </h4>
            <span className="text-sm text-slate-400">
              {formattedDate}
            </span>
          </div>

          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < review.rating
                    ? "text-amber-400 fill-amber-400"
                    : "text-slate-200"
                  }`}
              />
            ))}
          </div>

          <p className="text-slate-600">{review.comment}</p>
        </div>
      </div>
    </div>
  );
}