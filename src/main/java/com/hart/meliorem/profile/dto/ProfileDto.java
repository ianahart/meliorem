package com.hart.meliorem.profile.dto;

import java.sql.Timestamp;

public class ProfileDto {

    private Long id;

    private Timestamp createdAt;

    private Timestamp updatedAt;

    private String avatarUrl;

    private String schoolName;

    private String courses;

    public ProfileDto() {

    }

    public ProfileDto(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            String avatarUrl,
            String schoolName,
            String courses) {

        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.avatarUrl = avatarUrl;
        this.schoolName = schoolName;
        this.courses = courses;
    }

    public Long getId() {
        return id;
    }

    public String getCourses() {
        return courses;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public String getSchoolName() {
        return schoolName;
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

    public void setCourses(String courses) {
        this.courses = courses;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }
}
