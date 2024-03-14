package com.hart.meliorem.book.response;

import com.hart.meliorem.book.dto.BookDto;
import com.hart.meliorem.pagination.dto.PaginationDto;

public class GetAllBookResponse {

    private String message;

    private PaginationDto<BookDto> data;

    public GetAllBookResponse() {

    }

    public GetAllBookResponse(String message, PaginationDto<BookDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public PaginationDto<BookDto> getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(PaginationDto<BookDto> data) {
        this.data = data;
    }
}
