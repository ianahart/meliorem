package com.hart.meliorem.studysetcard.response;

import java.util.List;

import com.hart.meliorem.studysetcard.dto.StudySetCardFullDto;

public class GetStudySetCardResponse {

    private String message;

    private List<StudySetCardFullDto> data;

    public GetStudySetCardResponse() {

    }

    public GetStudySetCardResponse(String message, List<StudySetCardFullDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public List<StudySetCardFullDto> getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(List<StudySetCardFullDto> data) {
        this.data = data;
    }

}
