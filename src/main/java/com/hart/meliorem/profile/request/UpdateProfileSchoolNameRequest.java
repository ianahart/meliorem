package com.hart.meliorem.profile.request;

import jakarta.validation.constraints.Size;

public class UpdateProfileSchoolNameRequest {

    @Size(max = 250, message = "School name must be between 1 and 250 characters")
    private String schoolName;

    public UpdateProfileSchoolNameRequest() {

    }

    public UpdateProfileSchoolNameRequest(String schoolName) {
        this.schoolName = schoolName;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }
}
