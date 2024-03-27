package com.hart.meliorem.note;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hart.meliorem.studyset.StudySet;
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

@Entity
@Table(name = "note")
public class Note {

    @Id
    @SequenceGenerator(name = "note_sequence", sequenceName = "note_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "note_sequence")
    @Column(name = "id")
    private Long id;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "filename", length = 300)
    private String filename;

    @Column(name = "url", length = 400)
    private String url;

    @ManyToOne()
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne()
    @JoinColumn(name = "studyset_id", referencedColumnName = "id")
    private StudySet studySet;

    public Note() {

    }

    public Note(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            String filename,
            String url) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.filename = filename;
        this.url = url;
    }

    public Note(
            String filename,
            String url,
            User user,
            StudySet studySet) {
        this.filename = filename;
        this.url = url;
        this.user = user;
        this.studySet = studySet;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getUrl() {
        return url;
    }

    public StudySet getStudySet() {
        return studySet;
    }

    public String getFilename() {
        return filename;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setFilename(String filename) {
        this.filename = filename;
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

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((createdAt == null) ? 0 : createdAt.hashCode());
        result = prime * result + ((updatedAt == null) ? 0 : updatedAt.hashCode());
        result = prime * result + ((filename == null) ? 0 : filename.hashCode());
        result = prime * result + ((url == null) ? 0 : url.hashCode());
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
        Note other = (Note) obj;
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
        if (filename == null) {
            if (other.filename != null)
                return false;
        } else if (!filename.equals(other.filename))
            return false;
        if (url == null) {
            if (other.url != null)
                return false;
        } else if (!url.equals(other.url))
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
