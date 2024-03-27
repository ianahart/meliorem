package com.hart.meliorem.profile;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hart.meliorem.user.User;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "profile")
public class Profile {

    @Id
    @SequenceGenerator(name = "profile_sequence", sequenceName = "profile_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "profile_sequence")
    @Column(name = "id")
    private Long id;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "avatar_filename", length = 400)
    private String avatarFilename;

    @Column(name = "avatar_url", length = 400)
    private String avatarUrl;

    @Column(name = "school_name", length = 255)
    private String schoolName;

    @Column(name = "courses", length = 300)
    private String courses;

    @JsonIgnore
    @OneToOne(mappedBy = "profile", cascade = CascadeType.ALL)
    private User user;

    public Profile() {

    }

    public Profile(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            String avatarFilename,
            String avatarUrl,
            String schoolName,
            String courses) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.avatarFilename = avatarFilename;
        this.avatarUrl = avatarUrl;
        this.schoolName = schoolName;
        this.courses = courses;
    }

    public Long getId() {
        return id;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public String getCourses() {
        return courses;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public String getAvatarFilename() {
        return avatarFilename;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public User getUser() {
        return user;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setCourses(String courses) {
        this.courses = courses;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setAvatarFilename(String avatarFilename) {
        this.avatarFilename = avatarFilename;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((createdAt == null) ? 0 : createdAt.hashCode());
        result = prime * result + ((updatedAt == null) ? 0 : updatedAt.hashCode());
        result = prime * result + ((avatarFilename == null) ? 0 : avatarFilename.hashCode());
        result = prime * result + ((avatarUrl == null) ? 0 : avatarUrl.hashCode());
        result = prime * result + ((schoolName == null) ? 0 : schoolName.hashCode());
        result = prime * result + ((courses == null) ? 0 : courses.hashCode());
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
        Profile other = (Profile) obj;
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
        if (avatarFilename == null) {
            if (other.avatarFilename != null)
                return false;
        } else if (!avatarFilename.equals(other.avatarFilename))
            return false;
        if (avatarUrl == null) {
            if (other.avatarUrl != null)
                return false;
        } else if (!avatarUrl.equals(other.avatarUrl))
            return false;
        if (schoolName == null) {
            if (other.schoolName != null)
                return false;
        } else if (!schoolName.equals(other.schoolName))
            return false;
        if (courses == null) {
            if (other.courses != null)
                return false;
        } else if (!courses.equals(other.courses))
            return false;
        if (user == null) {
            if (other.user != null)
                return false;
        } else if (!user.equals(other.user))
            return false;
        return true;
    }


}
