package com.hart.meliorem.quiz.dto;

import java.sql.Timestamp;

public class QuizDto {

    private Long id;

    private Long userId;

    private Timestamp createdAt;

    private String category;

    private Integer correctAnswers;

    private Integer incorrectAnswers;

    public QuizDto() {

    }

    public QuizDto(
            Long id,
            Long userId,
            Timestamp createdAt,
            String category,
            Integer correctAnswers,
            Integer incorrectAnswers) {
        this.id = id;
        this.userId = userId;
        this.createdAt = createdAt;
        this.category = category;
        this.correctAnswers = correctAnswers;
        this.incorrectAnswers = incorrectAnswers;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getCategory() {
        return category;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Integer getCorrectAnswers() {
        return correctAnswers;
    }

    public Integer getIncorrectAnswers() {
        return incorrectAnswers;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setCorrectAnswers(Integer correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public void setIncorrectAnswers(Integer incorrectAnswers) {
        this.incorrectAnswers = incorrectAnswers;
    }
}
