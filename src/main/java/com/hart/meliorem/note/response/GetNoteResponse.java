package com.hart.meliorem.note.response;

public class GetNoteResponse {

    private String message;

    private String url;

    public GetNoteResponse() {

    }

    public GetNoteResponse(String message, String url) {
        this.message = message;
        this.url = url;
    }

    public String getMessage() {
        return message;
    }

    public String getUrl() {
        return url;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
