import api from "@/lib/api-client";
import { CreateReviewRequest, ReviewDto } from "./types";

export const createReview = async (
  review: CreateReviewRequest,
): Promise<ReviewDto> => {
  const { data } = await api.post("/reviews", review);
  return data;
};

export const getSessionReview = async (sessionId: string) => {
  const { data } = await api.get(`/reviews/session/${sessionId}`);
  return data;
};
