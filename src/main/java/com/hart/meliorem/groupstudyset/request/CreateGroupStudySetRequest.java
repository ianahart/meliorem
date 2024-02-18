package com.hart.meliorem.groupstudyset.request;

public class CreateGroupStudySetRequest {

    private Long studySetId;

    private Long groupId;

    public CreateGroupStudySetRequest() {

    }

    public CreateGroupStudySetRequest(Long studySetId, Long groupId) {
        this.studySetId = studySetId;
        this.groupId = groupId;
    }

    public Long getGroupId() {
        return groupId;
    }

    public Long getStudySetId() {
        return studySetId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public void setStudySetId(Long studySetId) {
        this.studySetId = studySetId;
    }

}
