package com.hart.meliorem.quiz;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hart.meliorem.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;

@Entity()
@Table(name = "quiz")
public class Quiz {

    @Id
    @SequenceGenerator(name = "quiz_sequence", sequenceName = "quiz_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "quiz_sequence")
    @Column(name = "id")
    private Long id;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "incorrect_answers")
    private Integer incorrectAnswers;

    @Column(name = "correct_answers")
    private Integer correctAnswers;

    @Column(name = "category")
    private String category;

    @ManyToOne()
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Quiz() {

    }

    public Quiz(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            Integer incorrectAnswers,
            Integer correctAnswers,
            String category) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.incorrectAnswers = incorrectAnswers;
        this.correctAnswers = correctAnswers;
        this.category = category;
    }

    public Quiz(
            Integer incorrectAnswers,
            Integer correctAnswers,
            String category,
            User user

    ) {
        this.incorrectAnswers = incorrectAnswers;
        this.correctAnswers = correctAnswers;
        this.category = category;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getCategory() {
        return category;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public Integer getCorrectAnswers() {
        return correctAnswers;
    }

    public Integer getIncorrectAnswers() {
        return incorrectAnswers;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setCorrectAnswers(Integer correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public void setIncorrectAnswers(Integer incorrectAnswers) {
        this.incorrectAnswers = incorrectAnswers;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((createdAt == null) ? 0 : createdAt.hashCode());
        result = prime * result + ((updatedAt == null) ? 0 : updatedAt.hashCode());
        result = prime * result + ((incorrectAnswers == null) ? 0 : incorrectAnswers.hashCode());
        result = prime * result + ((correctAnswers == null) ? 0 : correctAnswers.hashCode());
        result = prime * result + ((category == null) ? 0 : category.hashCode());
        result = prime * result + ((user == null) ? 0 : user.hashCode());
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
        Quiz other = (Quiz) obj;
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
        if (incorrectAnswers == null) {
            if (other.incorrectAnswers != null)
                return false;
        } else if (!incorrectAnswers.equals(other.incorrectAnswers))
            return false;
        if (correctAnswers == null) {
            if (other.correctAnswers != null)
                return false;
        } else if (!correctAnswers.equals(other.correctAnswers))
            return false;
        if (category == null) {
            if (other.category != null)
                return false;
        } else if (!category.equals(other.category))
            return false;
        if (user == null) {
            if (other.user != null)
                return false;
        } else if (!user.equals(other.user))
            return false;
        return true;
    }


}
