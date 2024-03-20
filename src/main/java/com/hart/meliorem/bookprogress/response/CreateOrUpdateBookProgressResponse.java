package com.hart.meliorem.bookprogress.response;

public class CreateOrUpdateBookProgressResponse {

    private String message;

    public CreateOrUpdateBookProgressResponse() {

    }

    public CreateOrUpdateBookProgressResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
