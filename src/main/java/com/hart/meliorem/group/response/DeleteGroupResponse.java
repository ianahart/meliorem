package com.hart.meliorem.group.response;

public class DeleteGroupResponse {

    private String message;

    public DeleteGroupResponse() {

    }

    public DeleteGroupResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
