package com.hart.meliorem.book;

import java.sql.Timestamp;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hart.meliorem.bookprogress.BookProgress;
import com.hart.meliorem.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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

    @JsonIgnore
    @OneToMany(mappedBy = "book", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BookProgress> bookProgresses;

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

    public List<BookProgress> getBookProgresses() {
        return bookProgresses;
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

    public void setBookProgresses(List<BookProgress> bookProgresses) {
        this.bookProgresses = bookProgresses;
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

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((createdAt == null) ? 0 : createdAt.hashCode());
        result = prime * result + ((updatedAt == null) ? 0 : updatedAt.hashCode());
        result = prime * result + ((title == null) ? 0 : title.hashCode());
        result = prime * result + ((author == null) ? 0 : author.hashCode());
        result = prime * result + ((bookshelf == null) ? 0 : bookshelf.hashCode());
        result = prime * result + ((pdfUrl == null) ? 0 : pdfUrl.hashCode());
        result = prime * result + ((imageUrl == null) ? 0 : imageUrl.hashCode());
        result = prime * result + ((downloadCount == null) ? 0 : downloadCount.hashCode());
        result = prime * result + ((user == null) ? 0 : user.hashCode());
        result = prime * result + ((bookProgresses == null) ? 0 : bookProgresses.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Book other = (Book) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (createdAt == null) {
            if (other.createdAt != null)
                return false;
        } else if (!createdAt.equals(other.createdAt))
            return false;
        if (updatedAt == null) {
            if (other.updatedAt != null)
                return false;
        } else if (!updatedAt.equals(other.updatedAt))
            return false;
        if (title == null) {
            if (other.title != null)
                return false;
        } else if (!title.equals(other.title))
            return false;
        if (author == null) {
            if (other.author != null)
                return false;
        } else if (!author.equals(other.author))
            return false;
        if (bookshelf == null) {
            if (other.bookshelf != null)
                return false;
        } else if (!bookshelf.equals(other.bookshelf))
            return false;
        if (pdfUrl == null) {
            if (other.pdfUrl != null)
                return false;
        } else if (!pdfUrl.equals(other.pdfUrl))
            return false;
        if (imageUrl == null) {
            if (other.imageUrl != null)
                return false;
        } else if (!imageUrl.equals(other.imageUrl))
            return false;
        if (downloadCount == null) {
            if (other.downloadCount != null)
                return false;
        } else if (!downloadCount.equals(other.downloadCount))
            return false;
        if (user == null) {
            if (other.user != null)
                return false;
        } else if (!user.equals(other.user))
            return false;
        if (bookProgresses == null) {
            if (other.bookProgresses != null)
                return false;
        } else if (!bookProgresses.equals(other.bookProgresses))
            return false;
        return true;
    }


}
