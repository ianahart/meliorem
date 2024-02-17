package com.hart.meliorem.user.response;

import java.util.List;

import com.hart.meliorem.pagination.dto.PaginationDto;
import com.hart.meliorem.user.dto.SearchUserDto;

public class GetUsersSearchResponse {

    private String message;

    private PaginationDto<SearchUserDto> data;

    public GetUsersSearchResponse() {

    }

    public GetUsersSearchResponse(String message, PaginationDto<SearchUserDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public PaginationDto<SearchUserDto> getData() {
        return data;
    }

    public void setData(PaginationDto<SearchUserDto> data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
