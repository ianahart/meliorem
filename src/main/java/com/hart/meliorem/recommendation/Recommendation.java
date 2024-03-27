package com.hart.meliorem.recommendation;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hart.meliorem.studyset.StudySet;
import com.hart.meliorem.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;

@Entity()
@Table(name = "recommendation")
public class Recommendation {

    @Id
    @SequenceGenerator(name = "recommendation_sequence", sequenceName = "recommendation_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "recommendation_sequence")
    @Column(name = "id")
    private Long id;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "last_generated_at")
    private Timestamp lastGeneratedAt;

    @ManyToOne()
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne()
    @JoinColumn(name = "studyset_id", referencedColumnName = "id")
    private StudySet studySet;

    public Recommendation() {

    }

    public Recommendation(Long id, Timestamp createdAt, Timestamp updatedAt, Timestamp lastGeneratedAt) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.lastGeneratedAt = lastGeneratedAt;
    }

    public Recommendation(User user, StudySet studySet, Timestamp lastGeneratedAt) {
        this.user = user;
        this.studySet = studySet;
        this.lastGeneratedAt = lastGeneratedAt;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Timestamp getLastGeneratedAt() {
        return lastGeneratedAt;
    }

    public StudySet getStudySet() {
        return studySet;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setStudySet(StudySet studySet) {
        this.studySet = studySet;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setLastGeneratedAt(Timestamp lastGeneratedAt) {
        this.lastGeneratedAt = lastGeneratedAt;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((createdAt == null) ? 0 : createdAt.hashCode());
        result = prime * result + ((updatedAt == null) ? 0 : updatedAt.hashCode());
        result = prime * result + ((lastGeneratedAt == null) ? 0 : lastGeneratedAt.hashCode());
        result = prime * result + ((user == null) ? 0 : user.hashCode());
        result = prime * result + ((studySet == null) ? 0 : studySet.hashCode());
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
        Recommendation other = (Recommendation) obj;
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
        if (lastGeneratedAt == null) {
            if (other.lastGeneratedAt != null)
                return false;
        } else if (!lastGeneratedAt.equals(other.lastGeneratedAt))
            return false;
        if (user == null) {
            if (other.user != null)
                return false;
        } else if (!user.equals(other.user))
            return false;
        if (studySet == null) {
            if (other.studySet != null)
                return false;
        } else if (!studySet.equals(other.studySet))
            return false;
        return true;
    }


}
