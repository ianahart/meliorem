package com.hart.meliorem.bookprogress;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hart.meliorem.book.Book;
import com.hart.meliorem.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity()
@Table(name = "book_progress")
public class BookProgress {

    @Id
    @SequenceGenerator(name = "book_progress_sequence", sequenceName = "book_progress_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "book_progress_sequence")
    @Column(name = "id")
    private Long id;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "current_page")
    private Integer currentPage;

    @Column(name = "total_pages")
    private Integer totalPages;

    @Column(name = "is_completed", columnDefinition = "boolean default false")
    private Boolean isCompleted;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @ManyToOne()
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne()
    @JoinColumn(name = "book_id", referencedColumnName = "id")
    private Book book;

    public BookProgress() {

    }

    public BookProgress(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            Integer currentPage,
            Integer totalPages,
            Boolean isCompleted,
            String notes) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.isCompleted = isCompleted;
    }

    public BookProgress(
            Integer currentPage,
            Integer totalPages,
            Boolean isCompleted,
            String notes,
            User user,
            Book book

    ) {

        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.isCompleted = isCompleted;
        this.notes = notes;
        this.user = user;
        this.book = book;
    }

    public Long getId() {
        return id;
    }

    public Book getBook() {
        return book;
    }

    public User getUser() {
        return user;
    }

    public String getNotes() {
        return notes;
    }

    public Integer getTotalPages() {
        return totalPages;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Integer getCurrentPage() {
        return currentPage;
    }

    public Boolean getIsCompleted() {
        return isCompleted;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public void setTotalPages(Integer totalPages) {
        this.totalPages = totalPages;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setCurrentPage(Integer currentPage) {
        this.currentPage = currentPage;
    }

    public void setIsCompleted(Boolean isCompleted) {
        this.isCompleted = isCompleted;
    }
}
