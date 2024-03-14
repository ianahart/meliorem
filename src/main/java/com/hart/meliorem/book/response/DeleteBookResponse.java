package com.hart.meliorem.book.response;

public class DeleteBookResponse {

    private String message;

    public DeleteBookResponse() {

    }

    public DeleteBookResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
