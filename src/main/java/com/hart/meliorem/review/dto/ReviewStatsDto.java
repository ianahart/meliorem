package com.hart.meliorem.review.dto;

public class ReviewStatsDto {

    private Float avgRating;

    private Long totalReviews;

    private Boolean curUserReviewed;

    public ReviewStatsDto() {

    }

    public ReviewStatsDto(Float avgRating, Long totalReviews, Boolean curUserReviewed) {
        this.avgRating = avgRating;
        this.totalReviews = totalReviews;
        this.curUserReviewed = curUserReviewed;
    }

    public Float getAvgRating() {
        return avgRating;
    }

    public Long getTotalReviews() {
        return totalReviews;
    }

    public Boolean getCurUserReviewed() {
        return curUserReviewed;
    }

    public void setCurUserReviewed(Boolean curUserReviewed) {
        this.curUserReviewed = curUserReviewed;
    }

    public void setAvgRating(Float avgRating) {
        this.avgRating = avgRating;
    }

    public void setTotalReviews(Long totalReviews) {
        this.totalReviews = totalReviews;
    }
}
