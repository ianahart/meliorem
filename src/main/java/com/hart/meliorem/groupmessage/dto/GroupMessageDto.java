package com.hart.meliorem.groupmessage.dto;

import java.sql.Timestamp;

public class GroupMessageDto {
    private String message;

    private Long id;

    private Long userId;

    private String fullName;

    private Timestamp createdAt;

    private String avatarUrl;

    private Long groupId;

    public GroupMessageDto() {

    }

    public GroupMessageDto(
            String message,
            Long id,
            Long userId,
            String fullName,
            Timestamp createdAt,
            String avatarUrl,
            Long groupId) {

        this.message = message;
        this.id = id;
        this.userId = userId;
        this.fullName = fullName;
        this.createdAt = createdAt;
        this.avatarUrl = avatarUrl;
        this.groupId = groupId;
    }

    public String getMessage() {
        return message;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getGroupId() {
        return groupId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
