package com.hart.meliorem.groupmember.response;

import com.hart.meliorem.groupmember.dto.GroupMemberInviteDto;
import com.hart.meliorem.pagination.dto.PaginationDto;

public class GetInviteResponse {

    private String message;

    private PaginationDto<GroupMemberInviteDto> data;

    public GetInviteResponse() {

    }

    public GetInviteResponse(String message, PaginationDto<GroupMemberInviteDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public PaginationDto<GroupMemberInviteDto> getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(PaginationDto<GroupMemberInviteDto> data) {
        this.data = data;
    }
}
