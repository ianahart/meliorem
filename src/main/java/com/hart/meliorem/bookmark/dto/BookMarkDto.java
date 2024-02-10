package com.hart.meliorem.bookmark.dto;

public class BookMarkDto {

    private Long id;

    private Boolean isBookMarked;

    public BookMarkDto() {

    }

    public BookMarkDto(Long id, Boolean isBookMarked) {
        this.id = id;
        this.isBookMarked = isBookMarked;
    }

    public Long getId() {
        return id;
    }

    public Boolean getIsBookMarked() {
        return isBookMarked;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setIsBookMarked(Boolean isBookMarked) {
        this.isBookMarked = isBookMarked;
    }
}
