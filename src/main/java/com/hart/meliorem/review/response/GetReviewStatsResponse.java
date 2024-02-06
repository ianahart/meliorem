package com.hart.meliorem.review.response;

import com.hart.meliorem.review.dto.ReviewStatsDto;

public class GetReviewStatsResponse {

    private String message;
    private ReviewStatsDto data;

    public GetReviewStatsResponse() {

    }

    public GetReviewStatsResponse(String message, ReviewStatsDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public ReviewStatsDto getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(ReviewStatsDto data) {
        this.data = data;
    }
}
