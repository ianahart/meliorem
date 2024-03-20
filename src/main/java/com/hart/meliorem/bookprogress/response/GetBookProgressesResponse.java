package com.hart.meliorem.bookprogress.response;

import com.hart.meliorem.bookprogress.dto.FullBookProgressDto;
import com.hart.meliorem.pagination.dto.PaginationDto;

public class GetBookProgressesResponse {

    private String message;

    private PaginationDto<FullBookProgressDto> data;

    public GetBookProgressesResponse() {

    }

    public GetBookProgressesResponse(String message, PaginationDto<FullBookProgressDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public PaginationDto<FullBookProgressDto> getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(PaginationDto<FullBookProgressDto> data) {
        this.data = data;
    }
}
