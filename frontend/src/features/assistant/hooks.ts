import { useQuery } from "@tanstack/react-query"
import { getAssistantById } from "./api"

export const useAssistant = (id: string) => {
    return useQuery({
        queryKey: ["assistant", id],
        queryFn: () => getAssistantById(id),
        enabled: !!id,
    });
};