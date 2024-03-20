package com.hart.meliorem.bookprogress.request;

public class CreateOrUpdateBookProgressRequest {

    private Long userId;

    private Long bookId;

    private String notes;

    private Integer currentPage;

    private Integer totalPages;

    public CreateOrUpdateBookProgressRequest() {

    }

    public CreateOrUpdateBookProgressRequest(
            Long userId,
            Long bookId,
            String notes,
            Integer currentPage,
            Integer totalPages) {
        this.userId = userId;
        this.bookId = bookId;
        this.notes = notes;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
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

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setTotalPages(Integer totalPages) {
        this.totalPages = totalPages;
    }

    public void setCurrentPage(Integer currentPage) {
        this.currentPage = currentPage;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
