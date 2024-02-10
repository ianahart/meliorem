package com.hart.meliorem.bookmark.response;

public class DeleteBookMarkResponse {

    private String message;

    public DeleteBookMarkResponse() {

    }

    public DeleteBookMarkResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
