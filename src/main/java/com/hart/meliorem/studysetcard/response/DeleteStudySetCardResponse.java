package com.hart.meliorem.studysetcard.response;

public class DeleteStudySetCardResponse {

    private String message;

    public DeleteStudySetCardResponse() {

    }

    public DeleteStudySetCardResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
