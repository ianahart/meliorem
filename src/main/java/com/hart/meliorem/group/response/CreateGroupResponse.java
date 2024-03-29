package com.hart.meliorem.group.response;

import com.hart.meliorem.group.dto.GroupDto;

public class CreateGroupResponse {

    private String message;

    private GroupDto data;

    public CreateGroupResponse() {

    }

    public CreateGroupResponse(String message, GroupDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public GroupDto getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(GroupDto data) {
        this.data = data;
    }
}
