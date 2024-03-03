package com.hart.meliorem.quiz.request;

public class CreateQuizRequest {

    private Long userId;

    private Integer correctAnswers;

    private Integer incorrectAnswers;

    private String category;

    public CreateQuizRequest() {

    }

    public CreateQuizRequest(
            Long userId,
            Integer correctAnswers,
            Integer incorrectAnswers,
            String category) {
        this.userId = userId;
        this.correctAnswers = correctAnswers;
        this.incorrectAnswers = incorrectAnswers;
        this.category = category;
    }

    public Long getUserId() {
        return userId;
    }

    public String getCategory() {
        return category;
    }

    public Integer getCorrectAnswers() {
        return correctAnswers;
    }

    public Integer getIncorrectAnswers() {
        return incorrectAnswers;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setCorrectAnswers(Integer correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public void setIncorrectAnswers(Integer incorrectAnswers) {
        this.incorrectAnswers = incorrectAnswers;
    }

}
