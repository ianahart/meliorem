package com.hart.meliorem.recommendation.dto;

import java.sql.Timestamp;

import com.hart.meliorem.studyset.Visibility;

public class RecommendationDto {
    private Long userId;

    private String avatarUrl;

    private Long id;

    private Long recommendationId;

    private Timestamp createdAt;

    private String course;

    private String description;

    private String folder;

    private String schoolName;

    private String title;

    private Visibility visibility;

    private String fullName;

    private Timestamp lastGeneratedAt;

    public RecommendationDto() {

    }

    public RecommendationDto(
            Long id,
            Long userId,
            String avatarUrl,
            Long recommendationId,
            Timestamp createdAt,
            String course,
            String description,
            String folder,
            String schoolName,
            String title,
            Visibility visibility,
            String fullName,
            Timestamp lastGeneratedAt) {
        this.id = id;
        this.userId = userId;
        this.avatarUrl = avatarUrl;
        this.recommendationId = recommendationId;
        this.createdAt = createdAt;
        this.course = course;
        this.description = description;
        this.folder = folder;
        this.schoolName = schoolName;
        this.title = title;
        this.visibility = visibility;
        this.fullName = fullName;
        this.lastGeneratedAt = lastGeneratedAt;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getRecommendationId() {
        return recommendationId;
    }

    public String getTitle() {
        return title;
    }

    public String getCourse() {
        return course;
    }

    public String getFolder() {
        return folder;
    }

    public String getFullName() {
        return fullName;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public String getDescription() {
        return description;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Visibility getVisibility() {
        return visibility;
    }

    public Timestamp getLastGeneratedAt() {
        return lastGeneratedAt;
    }

    public void setLastGeneratedAt(Timestamp lastGeneratedAt) {
        this.lastGeneratedAt = lastGeneratedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public void setFolder(String folder) {
        this.folder = folder;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
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

    public void setDescription(String description) {
        this.description = description;
    }

    public void setVisibility(Visibility visibility) {
        this.visibility = visibility;
    }

    public void setRecommendationId(Long recommendationId) {
        this.recommendationId = recommendationId;
    }
}
