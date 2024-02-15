package com.hart.meliorem.user.response;

import com.hart.meliorem.pagination.dto.PaginationDto;
import com.hart.meliorem.user.dto.InviteeDto;

public class GetUsersResponse {

    private String message;

    private PaginationDto<InviteeDto> data;

    public GetUsersResponse() {

    }

    public GetUsersResponse(String message, PaginationDto<InviteeDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public PaginationDto<InviteeDto> getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(PaginationDto<InviteeDto> data) {
        this.data = data;
    }
}
