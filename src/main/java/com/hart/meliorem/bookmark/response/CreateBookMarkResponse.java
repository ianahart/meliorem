package com.hart.meliorem.bookmark.response;

import com.hart.meliorem.bookmark.dto.BookMarkDto;

public class CreateBookMarkResponse {

    private String message;

    private BookMarkDto bookMark;

    public CreateBookMarkResponse() {

    }

    public CreateBookMarkResponse(String message, BookMarkDto bookMark) {
        this.message = message;
        this.bookMark = bookMark;
    }

    public String getMessage() {
        return message;
    }

    public BookMarkDto getBookMark() {
        return bookMark;
    }

    public void setBookMark(BookMarkDto bookMark) {
        this.bookMark = bookMark;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
