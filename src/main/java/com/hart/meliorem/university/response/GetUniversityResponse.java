package com.hart.meliorem.university.response;

import java.util.List;

import com.hart.meliorem.university.University;

public class GetUniversityResponse {

    private String message;
    private List<University> universities;

    public GetUniversityResponse() {

    }

    public GetUniversityResponse(String message, List<University> universities) {
        this.message = message;
        this.universities = universities;
    }

    public String getMessage() {
        return message;
    }

    public List<University> getUniversities() {
        return universities;
    }

    public void setUniversities(List<University> universities) {
        this.universities = universities;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
