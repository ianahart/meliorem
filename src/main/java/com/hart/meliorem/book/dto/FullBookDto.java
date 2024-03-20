package com.hart.meliorem.book.dto;

import com.hart.meliorem.bookprogress.dto.BookProgressDto;

public class FullBookDto {

    private BookDto book;

    private BookProgressDto bookProgress;

    public FullBookDto() {

    }

    public FullBookDto(BookDto book, BookProgressDto bookProgress) {
        this.book = book;
        this.bookProgress = bookProgress;
    }

    public BookDto getBook() {
        return book;
    }

    public BookProgressDto getBookProgress() {
        return bookProgress;
    }

    public void setBook(BookDto book) {
        this.book = book;
    }

    public void setBookProgress(BookProgressDto bookProgress) {
        this.bookProgress = bookProgress;
    }
}
