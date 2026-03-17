export interface Service {
    id: string;
    name: string;
    description?: string;
    price: number,
    category: string
}

export interface UpdateAssistantServiceRequest {
    serviceIds: string[];
}