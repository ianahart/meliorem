package com.hart.meliorem.groupstudyset.response;

public class CreateGroupStudySetResponse {

    private String message;

    public CreateGroupStudySetResponse() {

    }

    public CreateGroupStudySetResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
