package com.hart.meliorem.group.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CreateGroupRequest {

    @Size(min = 1, max = 200, message = "Group name must be between 1 and 200 characters")
    @NotNull
    private String name;

    public CreateGroupRequest() {

    }

    public CreateGroupRequest(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
