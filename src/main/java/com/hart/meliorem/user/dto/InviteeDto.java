package com.hart.meliorem.user.dto;

import java.sql.Timestamp;
import java.util.List;

import com.hart.meliorem.topic.dto.TopicDto;

public class InviteeDto {

    private Long userId;

    private String fullName;

    private String avatarUrl;

    private String schoolName;

    private List<TopicDto> topics;

    private String firstName;

    private Timestamp createdAt;

    public InviteeDto() {

    }

    public InviteeDto(
            Long userId,
            String fullName,
            String avatarUrl,
            String schoolName,
            String firstName,
            Timestamp createdAt) {
        this.userId = userId;
        this.fullName = fullName;
        this.avatarUrl = avatarUrl;
        this.schoolName = schoolName;
        this.firstName = firstName;
        this.createdAt = createdAt;
    }

    public Long getUserId() {
        return userId;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public String getFullName() {
        return fullName;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public List<TopicDto> getTopics() {
        return topics;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setTopics(List<TopicDto> topics) {
        this.topics = topics;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

}
