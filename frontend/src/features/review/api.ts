import api from "@/lib/api-client";
import { AssistantReviewDto, CreateReviewRequest, ReviewDto } from "./types";

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

export const getAssistantReviews = async (
  assistantId: string,
): Promise<AssistantReviewDto> => {
  const { data } = await api.get(`/reviews/assistant/${assistantId}`);
  return data;
};
