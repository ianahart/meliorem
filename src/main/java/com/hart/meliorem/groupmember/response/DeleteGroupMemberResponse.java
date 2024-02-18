package com.hart.meliorem.groupmember.response;

public class DeleteGroupMemberResponse {

    private String message;

    public DeleteGroupMemberResponse() {

    }

    public DeleteGroupMemberResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
