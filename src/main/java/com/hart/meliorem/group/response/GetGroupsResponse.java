package com.hart.meliorem.group.response;

import com.hart.meliorem.group.dto.GroupDto;
import com.hart.meliorem.pagination.dto.PaginationDto;

public class GetGroupsResponse {

    private String message;

    private PaginationDto<GroupDto> data;

    public GetGroupsResponse(String message, PaginationDto<GroupDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public PaginationDto<GroupDto> getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(PaginationDto<GroupDto> data) {
        this.data = data;
    }
}
