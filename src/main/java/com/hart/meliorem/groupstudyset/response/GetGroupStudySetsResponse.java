package com.hart.meliorem.groupstudyset.response;

import com.hart.meliorem.groupstudyset.dto.GroupStudySetDto;
import com.hart.meliorem.pagination.dto.PaginationDto;

public class GetGroupStudySetsResponse {

    private String message;

    private PaginationDto<GroupStudySetDto> data;

    public GetGroupStudySetsResponse() {

    }

    public GetGroupStudySetsResponse(String message, PaginationDto<GroupStudySetDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public PaginationDto<GroupStudySetDto> getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(PaginationDto<GroupStudySetDto> data) {
        this.data = data;
    }
}
