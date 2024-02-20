package com.hart.meliorem.group.response;

public class UpdateGroupResponse {

    private String message;

    public UpdateGroupResponse() {

    }

    public UpdateGroupResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
