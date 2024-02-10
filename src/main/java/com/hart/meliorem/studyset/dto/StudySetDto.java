package com.hart.meliorem.studyset.dto;

import java.sql.Timestamp;

import com.hart.meliorem.bookmark.dto.BookMarkDto;
import com.hart.meliorem.studyset.Visibility;

public class StudySetDto {

    private Long userId;

    private String avatarUrl;

    private Long id;

    private Timestamp createdAt;

    private String course;

    private String description;

    private String folder;

    private String schoolName;

    private String title;

    private Visibility visibility;

    private String fullName;

    private long totalStudySetCards;

    private BookMarkDto bookMark;

    public StudySetDto() {

    }

    public StudySetDto(
            Long userId,
            String avatarUrl,
            Long id,
            Timestamp createdAt,
            String course,
            String description,
            String folder,
            String schoolName,
            String title,
            Visibility visibility,
            String fullName) {
        this.userId = userId;
        this.avatarUrl = avatarUrl;
        this.id = id;
        this.createdAt = createdAt;
        this.course = course;
        this.description = description;
        this.folder = folder;
        this.schoolName = schoolName;
        this.title = title;
        this.visibility = visibility;
        this.fullName = fullName;
    }

    public Long getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public Long getUserId() {
        return userId;
    }

    public long getTotalStudySetCards() {
        return totalStudySetCards;
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

    public String getSchoolName() {
        return schoolName;
    }

    public BookMarkDto getBookMark() {
        return bookMark;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public String getDescription() {
        return description;
    }

    public Visibility getVisibility() {
        return visibility;
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

    public void setTotalStudySetCards(long totalStudySetCards) {
        this.totalStudySetCards = totalStudySetCards;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setBookMark(BookMarkDto bookMark) {
        this.bookMark = bookMark;
    }

}
