package com.hart.meliorem.profile.request;

import jakarta.validation.constraints.Size;

public class UpdateProfileCourseRequest {

    @Size(max = 300, message = "Courses must be between 1 and 300 characters")
    private String courses;

    public UpdateProfileCourseRequest() {

    }

    public UpdateProfileCourseRequest(String courses) {

        this.courses = courses;
    }

    public String getCourses() {
        return courses;
    }

    public void setCourses(String courses) {
        this.courses = courses;
    }
}
