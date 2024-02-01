package com.hart.meliorem.studyset.response;

public class EditStudySetResponse {

    private String message;

    public EditStudySetResponse() {

    }

    public EditStudySetResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
