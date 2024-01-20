package com.hart.meliorem.profile.response;

public class UpdateProfileCourseResponse {

    private String message;

    private String courses;

    public UpdateProfileCourseResponse() {

    }

    public UpdateProfileCourseResponse(String message, String courses) {
        this.message = message;
        this.courses = courses;
    }

    public String getMessage() {
        return message;
    }

    public String getCourses() {
        return courses;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setCourses(String courses) {
        this.courses = courses;
    }
}
