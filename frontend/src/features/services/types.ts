export interface Service {
    id: string;
    name: string;
    description?: string;
}

export interface UpdateAssistantServiceRequest {
    serviceIds: string[];
}