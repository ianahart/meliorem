package com.hart.meliorem.streak.request;

public class CreateStreakRequest {

    private Long studySetId;

    public CreateStreakRequest() {

    }

    public CreateStreakRequest(Long studySetId) {
        this.studySetId = studySetId;
    }

    public Long getStudySetId() {
        return studySetId;
    }

    public void setStudySetId(Long studySetId) {
        this.studySetId = studySetId;
    }
}
