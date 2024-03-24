package com.hart.meliorem.goals.response;

public class DeleteGoalResponse {

    private String message;

    public DeleteGoalResponse() {

    }

    public DeleteGoalResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
