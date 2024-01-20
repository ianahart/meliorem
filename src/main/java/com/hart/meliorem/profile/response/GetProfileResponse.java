package com.hart.meliorem.profile.response;

import com.hart.meliorem.profile.dto.ProfileDto;

public class GetProfileResponse {

    private String message;

    private ProfileDto profile;

    public GetProfileResponse() {

    }

    public GetProfileResponse(String message, ProfileDto profile) {
        this.message = message;
        this.profile = profile;
    }

    public String getMessage() {
        return message;
    }

    public ProfileDto getProfile() {
        return profile;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setProfile(ProfileDto profile) {
        this.profile = profile;
    }
}
