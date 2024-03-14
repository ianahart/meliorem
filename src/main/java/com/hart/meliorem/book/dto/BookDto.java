package com.hart.meliorem.book.dto;

public class BookDto {

    private Long id;

    private String title;

    private String author;

    private String bookshelf;

    private String pdfUrl;

    private String imageUrl;

    private Integer downloadCount;

    public BookDto() {

    }

    public BookDto(
            Long id,
            String title,
            String author,
            String bookshelf,
            String pdfUrl,
            String imageUrl,
            Integer downloadCount) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.bookshelf = bookshelf;
        this.pdfUrl = pdfUrl;
        this.imageUrl = imageUrl;
        this.downloadCount = downloadCount;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public String getPdfUrl() {
        return pdfUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getBookshelf() {
        return bookshelf;
    }

    public Integer getDownloadCount() {
        return downloadCount;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setPdfUrl(String pdfUrl) {
        this.pdfUrl = pdfUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setBookshelf(String bookshelf) {
        this.bookshelf = bookshelf;
    }

    public void setDownloadCount(Integer downloadCount) {
        this.downloadCount = downloadCount;
    }
}
