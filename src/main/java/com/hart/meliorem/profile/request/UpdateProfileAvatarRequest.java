package com.hart.meliorem.profile.request;

public class UpdateProfileAvatarRequest {

    private String avatarUrl;

    public UpdateProfileAvatarRequest() {

    }

    public UpdateProfileAvatarRequest(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }
}
