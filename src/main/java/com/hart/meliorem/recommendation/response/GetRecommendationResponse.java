package com.hart.meliorem.recommendation.response;

import com.hart.meliorem.pagination.dto.PaginationDto;
import com.hart.meliorem.recommendation.dto.RecommendationDto;

public class GetRecommendationResponse {

    private String message;

    private PaginationDto<RecommendationDto> data;

    public GetRecommendationResponse() {

    }

    public GetRecommendationResponse(String message, PaginationDto<RecommendationDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public PaginationDto<RecommendationDto> getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(PaginationDto<RecommendationDto> data) {
        this.data = data;
    }
}
