package com.hart.meliorem.bookmark.response;

import com.hart.meliorem.bookmark.dto.BookMarkFullDto;
import com.hart.meliorem.pagination.dto.PaginationDto;

public class GetAllBookMarkResponse {

    private String message;
    private PaginationDto<BookMarkFullDto> data;

    public GetAllBookMarkResponse() {

    }

    public GetAllBookMarkResponse(String message, PaginationDto<BookMarkFullDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public PaginationDto<BookMarkFullDto> getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(PaginationDto<BookMarkFullDto> data) {
        this.data = data;
    }
}
