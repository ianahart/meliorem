package com.hart.meliorem.bookmark.request;

public class CreateBookMarkRequest {

    private Long studySetId;

    public CreateBookMarkRequest() {

    }

    public CreateBookMarkRequest(Long studySetId) {
        this.studySetId = studySetId;
    }

    public Long getStudySetId() {
        return studySetId;
    }

    public void setStudySetId(Long studySetId) {
        this.studySetId = studySetId;
    }
}
