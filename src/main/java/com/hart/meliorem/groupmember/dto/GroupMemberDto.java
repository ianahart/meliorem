package com.hart.meliorem.groupmember.dto;

public class GroupMemberDto {
    private Long id;

    private Long userId;

    private String avatarUrl;

    private String schoolName;

    private String fullName;

    public GroupMemberDto() {

    }

    public GroupMemberDto(
            Long id,
            Long userId,
            String avatarUrl,
            String schoolName,
            String fullName) {
        this.id = id;
        this.userId = userId;
        this.avatarUrl = avatarUrl;
        this.schoolName = schoolName;
        this.fullName = fullName;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
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

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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
}
