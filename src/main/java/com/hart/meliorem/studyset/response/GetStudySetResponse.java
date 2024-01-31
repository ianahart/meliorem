package com.hart.meliorem.studyset.response;

import com.hart.meliorem.studyset.dto.StudySetDto;

public class GetStudySetResponse {

    private String message;

    private StudySetDto data;

    public GetStudySetResponse() {

    }

    public GetStudySetResponse(String message, StudySetDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public StudySetDto getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(StudySetDto data) {
        this.data = data;
    }
}
