package com.hart.meliorem.group.response;

import com.hart.meliorem.group.dto.CreateGroupDto;

public class CreateGroupResponse {

    private String message;

    private CreateGroupDto data;

    public CreateGroupResponse() {

    }

    public CreateGroupResponse(String message, CreateGroupDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public CreateGroupDto getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(CreateGroupDto data) {
        this.data = data;
    }
}
