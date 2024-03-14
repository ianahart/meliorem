package com.hart.meliorem.book.response;

import com.hart.meliorem.book.dto.BookDto;

public class GetBookResponse {

    private String message;

    private BookDto data;

    public GetBookResponse() {

    }

    public GetBookResponse(String message, BookDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public BookDto getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(BookDto data) {
        this.data = data;
    }
}
