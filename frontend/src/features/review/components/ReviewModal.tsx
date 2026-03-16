"use client"

import { useState, useEffect } from "react"
import { useCreateReview } from "../hooks"
import { Star, CheckCircle2, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
  sessionId: string
  isOpen: boolean
  onClose: () => void
}

const RATING_LABELS = ["Poor", "Fair", "Good", "Very Good", "Excellent"];
const QUICK_TAGS = ["Professional", "Fast Response", "Very Helpful", "Clear Communication"];

export default function ReviewModal({ sessionId, isOpen, onClose }: Props) {
  const { mutate, isPending } = useCreateReview()

  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setRating(0);
      setHoveredRating(0);
      setComment("");
      setIsSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null

  const handleTagClick = (tag: string) => {
    setComment(prev => {
      if (prev.includes(tag)) {
        return prev.replace(tag, "").replace(/\s+/g, " ").trim();
      }
      return (prev + " " + tag).trim();
    });
  }

  const handleSubmit = () => {
    if (rating === 0) return;

    mutate(
      {
        sessionId,
        rating,
        comment
      },
      {
        onSuccess: () => {
          setIsSuccess(true)
          setTimeout(() => {
            onClose()
            setIsSuccess(false)
          }, 1500)
        }
      }
    )
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
      <div
        className={cn(
          "bg-white rounded-3xl p-8 w-full max-w-md space-y-6 shadow-2xl relative overflow-hidden transition-all duration-300",
          "animate-in fade-in zoom-in-95 duration-200"
        )}
      >
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 animate-bounce" />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Thank You!</h2>
              <p className="text-slate-500 font-medium tracking-wide">Your feedback helps us improve.</p>
            </div>
          </div>
        ) : (
          <>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Rate your experience
              </h2>
              <div className="h-6">
                {(hoveredRating || rating) > 0 && (
                  <p className="text-indigo-600 font-bold uppercase text-[10px] tracking-[0.2em] animate-in slide-in-from-bottom-1 duration-200">
                    {RATING_LABELS[(hoveredRating || rating) - 1]}
                  </p>
                )}
              </div>
            </div>

            {/* Rating Stars */}
            <div className="flex justify-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 hover:scale-125 transition-transform active:scale-90 duration-200"
                >
                  <Star
                    className={cn(
                      "w-11 h-11 transition-all duration-300",
                      star <= (hoveredRating || rating)
                        ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]"
                        : "fill-slate-100 text-slate-200 hover:text-slate-300"
                    )}
                  />
                </button>
              ))}
            </div>

            {/* Quick Feedback Chips */}
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {QUICK_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={cn(
                    "px-4 py-2 text-[11px] font-bold uppercase tracking-wider rounded-xl border transition-all active:scale-95",
                    comment.includes(tag)
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200"
                      : "bg-white border-slate-200 text-slate-500 hover:border-indigo-400 hover:text-indigo-600"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Comment Section */}
            <div className="space-y-2 pt-2 group/input">
              <textarea
                placeholder="Write your thoughts here... (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value.slice(0, 500))}
                rows={4}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl p-4 text-sm 
                           focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 
                           transition-all placeholder:text-slate-400 resize-none shadow-inner"
              />
              <div className="flex justify-end">
                <span className={cn(
                  "text-[10px] font-black tracking-widest uppercase",
                  comment.length >= 500 ? "text-rose-500" : "text-slate-400"
                )}>
                  {comment.length}/500
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-4 border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-colors active:scale-95"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={isPending || rating === 0}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold text-xs uppercase tracking-widest rounded-2xl 
                           hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all 
                           shadow-xl shadow-indigo-100 active:scale-95"
              >
                {isPending ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}