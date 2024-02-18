package com.hart.meliorem.groupstudyset.response;

public class DeleteGroupStudySetResponse {

    private String message;

    public DeleteGroupStudySetResponse() {

    }

    public DeleteGroupStudySetResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
