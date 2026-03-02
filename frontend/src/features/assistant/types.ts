// Need to create types for DTOs, request & response later
import { Service } from "@/features/services/types";

export interface AssistantProfile {
  id: string;
  firstName: string;
  lastName: string;
  bio?: string;
  services: Service[];
}

export interface AssistantReview {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}