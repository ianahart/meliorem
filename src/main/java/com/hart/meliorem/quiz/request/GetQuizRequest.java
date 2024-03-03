package com.hart.meliorem.quiz.request;

public class GetQuizRequest {

    private String quizAPIUrl;

    private String topicName;

    public GetQuizRequest() {

    }

    public GetQuizRequest(String quizAPIUrl, String topicName) {
        this.quizAPIUrl = quizAPIUrl;
        this.topicName = topicName;
    }

    public String getTopicName() {
        return topicName;
    }

    public String getQuizAPIUrl() {
        return quizAPIUrl;
    }

    public void setQuizAPIUrl(String quizAPIUrl) {
        this.quizAPIUrl = quizAPIUrl;
    }

    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }
}
