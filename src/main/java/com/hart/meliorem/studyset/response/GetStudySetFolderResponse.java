package com.hart.meliorem.studyset.response;

import java.util.List;

import com.hart.meliorem.studyset.dto.StudySetFolderDto;

public class GetStudySetFolderResponse {

    private String message;
    private List<StudySetFolderDto> studySetFolders;

    public GetStudySetFolderResponse() {

    }

    public GetStudySetFolderResponse(String message, List<StudySetFolderDto> studySetFolders) {
        this.message = message;
        this.studySetFolders = studySetFolders;
    }

    public List<StudySetFolderDto> getStudySetFolders() {
        return studySetFolders;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setStudySetFolders(List<StudySetFolderDto> studySetFolders) {
        this.studySetFolders = studySetFolders;
    }
}
