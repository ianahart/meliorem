package com.hart.meliorem.quiz.response;

public class CreateQuizResponse {

    private String message;

    public CreateQuizResponse() {

    }

    public CreateQuizResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
