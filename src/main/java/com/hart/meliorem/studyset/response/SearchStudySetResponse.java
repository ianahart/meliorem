package com.hart.meliorem.studyset.response;

import com.hart.meliorem.pagination.dto.PaginationDto;
import com.hart.meliorem.studyset.dto.StudySetDto;

public class SearchStudySetResponse {

    private String message;

    private PaginationDto<StudySetDto> data;

    public SearchStudySetResponse() {

    }

    public SearchStudySetResponse(String message, PaginationDto<StudySetDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public PaginationDto<StudySetDto> getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(PaginationDto<StudySetDto> data) {
        this.data = data;
    }
}
