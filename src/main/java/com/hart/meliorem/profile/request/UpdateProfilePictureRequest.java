package com.hart.meliorem.profile.request;

import org.springframework.web.multipart.MultipartFile;

public class UpdateProfilePictureRequest {

    private MultipartFile profilePicture;

    public UpdateProfilePictureRequest() {

    }

    public UpdateProfilePictureRequest(MultipartFile profilePicture) {
        this.profilePicture = profilePicture;
    }

    public MultipartFile getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(MultipartFile profilePicture) {
        this.profilePicture = profilePicture;
    }
}
