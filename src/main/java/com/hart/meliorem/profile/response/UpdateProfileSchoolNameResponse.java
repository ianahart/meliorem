package com.hart.meliorem.profile.response;

public class UpdateProfileSchoolNameResponse {

    private String message;

    private String schoolName;

    public UpdateProfileSchoolNameResponse() {

    }

    public UpdateProfileSchoolNameResponse(String message, String schoolName) {
        this.message = message;
        this.schoolName = schoolName;
    }

    public String getMessage() {
        return message;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }
}
