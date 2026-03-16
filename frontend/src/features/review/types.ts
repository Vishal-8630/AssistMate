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
    rating: number,
    comment?: string,
    createdAt: string
}