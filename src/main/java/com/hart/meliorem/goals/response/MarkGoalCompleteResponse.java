package com.hart.meliorem.goals.response;

public class MarkGoalCompleteResponse {

    private String message;

    public MarkGoalCompleteResponse() {

    }

    public MarkGoalCompleteResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
