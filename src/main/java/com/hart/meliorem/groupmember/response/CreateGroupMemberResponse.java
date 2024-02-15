package com.hart.meliorem.groupmember.response;

public class CreateGroupMemberResponse {

    private String message;

    public CreateGroupMemberResponse() {

    }

    public CreateGroupMemberResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
