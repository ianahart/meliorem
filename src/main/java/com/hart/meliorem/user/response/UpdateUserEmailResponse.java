package com.hart.meliorem.user.response;

public class UpdateUserEmailResponse {

    private String message;
    private String email;

    public UpdateUserEmailResponse() {

    }

    public UpdateUserEmailResponse(String message, String email) {
        this.message = message;
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public String getEmail() {
        return email;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
