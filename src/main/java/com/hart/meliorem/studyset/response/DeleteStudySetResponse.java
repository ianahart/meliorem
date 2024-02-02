package com.hart.meliorem.studyset.response;

public class DeleteStudySetResponse {

    private String message;

    public DeleteStudySetResponse() {

    }

    public DeleteStudySetResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
