package com.hart.meliorem.quiz.dto;

import java.util.List;

public class QuizResultDto {

    private String type;

    private String difficulty;

    private String category;

    private String question;

    private String correctAnswer;

    private List<Object> incorrectAnswers;

    public QuizResultDto(
            String type,
            String difficulty,
            String category,
            String question,
            String correctAnswer,
            List<Object> incorrectAnswers) {
        this.type = type;
        this.difficulty = difficulty;
        this.category = category;
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.incorrectAnswers = incorrectAnswers;
    }

    public String getType() {
        return type;
    }

    public String getCategory() {
        return category;
    }

    public String getQuestion() {
        return question;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public List<Object> getIncorrectAnswers() {
        return incorrectAnswers;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setIncorrectAnswers(List<Object> incorrectAnswers) {
        this.incorrectAnswers = incorrectAnswers;
    }

}
