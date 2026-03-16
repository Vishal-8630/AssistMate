"use client"

import { useState } from "react"
import { useCreateReview } from "../hooks"

interface Props {
  sessionId: string
  isOpen: boolean
  onClose: () => void
}

export default function ReviewModal({ sessionId, isOpen, onClose }: Props) {
  const { mutate, isPending } = useCreateReview()

  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")

  if (!isOpen) return null

  const handleSubmit = () => {
    mutate(
      {
        sessionId,
        rating,
        comment
      },
      {
        onSuccess: () => {
          onClose()
        }
      }
    )
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-[400px] space-y-4">

        <h2 className="text-lg font-semibold">
          Rate your experience
        </h2>

        {/* Rating */}
        <div className="flex gap-2 text-2xl">
          {[1,2,3,4,5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={star <= rating ? "text-yellow-500" : "text-gray-300"}
            >
              ★
            </button>
          ))}
        </div>

        {/* Comment */}
        <textarea
          placeholder="Write a comment (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded-md p-2"
        />

        {/* Actions */}
        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            {isPending ? "Submitting..." : "Submit Review"}
          </button>

        </div>

      </div>
    </div>
  )
}