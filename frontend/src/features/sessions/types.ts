export type SessionStatus = 
    | "Requested"
    | "Active"
    | "Rejected"
    | "Completed"
    | "Cancelled";

export interface CreateSessionRequest {
    assistantId: string;
    serviceId: string;
}

export interface CreateSessionResponse {
    sessionId: string;
    status: SessionStatus;
}

export interface AcceptSessionResponse {
    sessionId: string;
    status: SessionStatus;
}

export interface RejectSessionResponse {
    sessionId: string;
    status: SessionStatus;
}

export interface SessionDto {
    sessionId: string;
    assistantId: string;
    clientId: string;
    serviceName: string;
    status: SessionStatus;
    createdAt: string;
}

export type GetMySessionsResponse = SessionDto[];