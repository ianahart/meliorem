package com.hart.meliorem.groupmember.response;

import com.hart.meliorem.group.dto.GroupDto;

public class UpdateGroupMemberResponse {

    private String message;

    private GroupDto data;

    public UpdateGroupMemberResponse() {

    }

    public UpdateGroupMemberResponse(String message, GroupDto data) {
        this.message = message;
        this.data  = data;
    }

    public String getMessage() {
        return message;
    }

    public GroupDto getData() {
        return data;
    }

    public void setData(GroupDto data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
