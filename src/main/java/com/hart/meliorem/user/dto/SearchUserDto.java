package com.hart.meliorem.user.dto;

public class SearchUserDto {

    private Long id;

    private String avatarUrl;

    private String schoolName;

    private String fullName;

    public SearchUserDto() {

    }

    public SearchUserDto(
            Long id,
            String avatarUrl,
            String schoolName,
            String fullName) {
        this.id = id;
        this.avatarUrl = avatarUrl;
        this.schoolName = schoolName;
        this.fullName = fullName;
    }

    public Long getId() {
        return id;
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
