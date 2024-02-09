package com.hart.meliorem.studyset.response;

import com.hart.meliorem.pagination.dto.PaginationDto;
import com.hart.meliorem.studyset.dto.StudySetFolderDto;

public class GetStudySetDistinctFolderResponse {

    private String message;

    private PaginationDto<StudySetFolderDto> data;

    public GetStudySetDistinctFolderResponse() {

    }

    public GetStudySetDistinctFolderResponse(String message, PaginationDto<StudySetFolderDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public PaginationDto<StudySetFolderDto> getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(PaginationDto<StudySetFolderDto> data) {
        this.data = data;
    }

}
