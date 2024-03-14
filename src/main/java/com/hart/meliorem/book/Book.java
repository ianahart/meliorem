package com.hart.meliorem.book;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hart.meliorem.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;

@Entity()
@Table(name = "books")
public class Book {

    @Id
    @SequenceGenerator(name = "book_sequence", sequenceName = "book_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "book_sequence")
    @Column(name = "id")
    private Long id;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "title", length = 250, unique = true)
    private String title;

    @Column(name = "author", length = 200)
    private String author;

    @Column(name = "bookshelf", length = 100)
    private String bookshelf;

    @Column(name = "pdf_url")
    private String pdfUrl;

    private String imageUrl;

    @Column(name = "download_count")
    private Integer downloadCount;

    @ManyToOne()
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Book() {

    }

    public Book(
            Long id,
            String title,
            String author,
            String bookshelf,
            String pdfUrl,
            String imageUrl,
            Integer downloadCount

    ) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.bookshelf = bookshelf;
        this.pdfUrl = pdfUrl;
        this.imageUrl = imageUrl;
        this.downloadCount = downloadCount;
    }

    public Book(
            String title,
            String author,
            String bookshelf,
            String pdfUrl,
            String imageUrl,
            Integer downloadCount,
            User user) {
        this.title = title;
        this.author = author;
        this.bookshelf = bookshelf;
        this.pdfUrl = pdfUrl;
        this.imageUrl = imageUrl;
        this.downloadCount = downloadCount;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
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

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public Integer getDownloadCount() {
        return downloadCount;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setDownloadCount(Integer downloadCount) {
        this.downloadCount = downloadCount;
    }
}
