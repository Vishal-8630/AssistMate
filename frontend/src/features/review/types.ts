export interface CreateReviewRequest {
    sessionId: string
    rating: number
    comment?: string
}

export interface ReviewDto {
    id: string,
    sessionId: string,
    reviewerId: string,
    revieweeId: string,
    reviewerName: string,
    rating: number,
    comment?: string,
    createdAt: string
}

export interface AssistantReviewDto {
    averageRating: number
    totalReviews: number
    reviews: ReviewDto[]
}