package com.hart.meliorem.book.response;

import com.hart.meliorem.book.dto.FullBookDto;

public class GetBookResponse {

    private String message;

    private FullBookDto data;

    public GetBookResponse() {

    }

    public GetBookResponse(String message, FullBookDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public FullBookDto getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(FullBookDto data) {
        this.data = data;
    }
}
