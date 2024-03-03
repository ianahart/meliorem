package com.hart.meliorem.quiz.dto;

import java.util.List;

public class GetQuizDto {

    private List<QuizResultDto> quizResults;

    private String topicName;

    public GetQuizDto() {

    }

    public GetQuizDto(List<QuizResultDto> quizResults, String topicName) {
        this.quizResults = quizResults;
        this.topicName = topicName;
    }

    public String getTopicName() {
        return topicName;
    }

    public List<QuizResultDto> getQuizResults() {
        return quizResults;
    }

    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }

    public void setQuizResults(List<QuizResultDto> quizResults) {
        this.quizResults = quizResults;
    }

}
