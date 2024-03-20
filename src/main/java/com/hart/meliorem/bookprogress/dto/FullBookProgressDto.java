package com.hart.meliorem.bookprogress.dto;

public class FullBookProgressDto extends BookProgressDto {

    private String imageUrl;

    public FullBookProgressDto() {

    }

    public FullBookProgressDto(
            Long userId,
            Long bookId,
            Long id,
            Integer currentPage,
            Integer totalPages,
            String notes,
            Boolean isCompleted,
            String imageUrl) {
        super(userId, bookId, id, currentPage, totalPages, notes, isCompleted);
        this.imageUrl = imageUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

}
