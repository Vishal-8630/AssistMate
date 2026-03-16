import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createReview, getSessionReview } from "./api"

export const useCreateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createReview,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["assistantReviews"]
            })
        }
    });
};

export const useSessionReview = (sessionId: string) => {
    return useQuery({
        queryKey: ["sessionReview", sessionId],
        queryFn: () => getSessionReview(sessionId),
        enabled: !!sessionId
    });
};