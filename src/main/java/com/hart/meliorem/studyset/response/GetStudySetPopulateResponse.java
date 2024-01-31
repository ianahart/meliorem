package com.hart.meliorem.studyset.response;

import com.hart.meliorem.studyset.dto.StudySetPopulateDto;

public class GetStudySetPopulateResponse {

    private String message;
    private StudySetPopulateDto data;

    public GetStudySetPopulateResponse() {

    }

    public GetStudySetPopulateResponse(String message, StudySetPopulateDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public StudySetPopulateDto getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(StudySetPopulateDto data) {
        this.data = data;
    }
}
