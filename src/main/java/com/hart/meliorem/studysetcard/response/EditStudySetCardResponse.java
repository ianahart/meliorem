package com.hart.meliorem.studysetcard.response;

public class EditStudySetCardResponse {

    private String message;

    public EditStudySetCardResponse() {
    }

    public EditStudySetCardResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
