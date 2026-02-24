import api from "@/lib/api-client"

export const getAssistantById = async (id: string) => {
    const { data } = await api.get(`/assistants/${id}`);
    return data;
}