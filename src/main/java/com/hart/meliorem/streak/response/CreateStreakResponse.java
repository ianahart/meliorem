package com.hart.meliorem.streak.response;

public class CreateStreakResponse {

    private String message;

    public CreateStreakResponse() {

    }

    public CreateStreakResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
