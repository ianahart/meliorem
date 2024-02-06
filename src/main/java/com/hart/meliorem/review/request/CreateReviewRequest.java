package com.hart.meliorem.review.request;

public class CreateReviewRequest {

    private Long userId;

    private Long studySetId;

    private Byte rating;

    private String feedback;

    public CreateReviewRequest() {

    }

    public CreateReviewRequest(Long userId, Long studySetId, Byte rating, String feedback) {
        this.userId = userId;
        this.studySetId = studySetId;
        this.rating = rating;
        this.feedback = feedback;
    }

    public Byte getRating() {
        return rating;
    }

    public Long getUserId() {
        return userId;
    }

    public String getFeedback() {
        return feedback;
    }

    public Long getStudySetId() {
        return studySetId;
    }

    public void setRating(Byte rating) {
        this.rating = rating;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public void setStudySetId(Long studySetId) {
        this.studySetId = studySetId;
    }
}
