package com.hart.meliorem.book.response;


public class ProxyPdfBookResponse {

    private String message;

    public ProxyPdfBookResponse() {

    }

    public ProxyPdfBookResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
