import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createReview, getAssistantReviews, getSessionReview } from "./api";
import { AssistantReviewDto } from "./types";

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assistantReviews"],
      });
    },
  });
};

export const useSessionReview = (sessionId: string) => {
  return useQuery({
    queryKey: ["sessionReview", sessionId],
    queryFn: () => getSessionReview(sessionId),
    enabled: !!sessionId,
  });
};

export const useAssistantReviews = (assistantId: string) => {
  return useQuery<AssistantReviewDto>({
    queryKey: ["assistantReviews", assistantId],
    queryFn: () => getAssistantReviews(assistantId),
    enabled: !!assistantId,
  });
};
