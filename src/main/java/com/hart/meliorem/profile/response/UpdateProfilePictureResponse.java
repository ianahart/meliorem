package com.hart.meliorem.profile.response;

public class UpdateProfilePictureResponse {

    private String message;
    private String avatarUrl;

    public UpdateProfilePictureResponse() {

    }

    public UpdateProfilePictureResponse(String message, String avatarUrl) {
        this.message = message;
        this.avatarUrl = avatarUrl;
    }

    public String getMessage() {
        return message;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }
}
