package com.hart.meliorem.authentication.response;

public class RegisterResponse {
    private String message;

    public RegisterResponse() {

    }

    public RegisterResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
