package com.hart.meliorem.bookprogress.dto;

public class BookProgressDto {

    private Long userId;

    private Long bookId;

    private Long id;

    private Integer currentPage;

    private Integer totalPages;

    private String notes;

    private Boolean isCompleted;

    public BookProgressDto() {

    }

    public BookProgressDto(
            Long userId,
            Long bookId,
            Long id,
            Integer currentPage,
            Integer totalPages,
            String notes,
            Boolean isCompleted) {
        this.userId = userId;
        this.bookId = bookId;
        this.id = id;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.notes = notes;
        this.isCompleted = isCompleted;
    }

    public Long getId() {
        return id;
    }

    public Long getBookId() {
        return bookId;
    }

    public Long getUserId() {
        return userId;
    }

    public String getNotes() {
        return notes;
    }

    public Integer getTotalPages() {
        return totalPages;
    }

    public Integer getCurrentPage() {
        return currentPage;
    }

    public Boolean getIsCompleted() {
        return isCompleted;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public void setTotalPages(Integer totalPages) {
        this.totalPages = totalPages;
    }

    public void setCurrentPage(Integer currentPage) {
        this.currentPage = currentPage;
    }

    public void setIsCompleted(Boolean isCompleted) {
        this.isCompleted = isCompleted;
    }
}
