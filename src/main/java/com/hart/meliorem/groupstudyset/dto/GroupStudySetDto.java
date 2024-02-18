package com.hart.meliorem.groupstudyset.dto;

public class GroupStudySetDto {

    private Long id;

    private Long groupId;

    private Long studySetId;

    private String title;

    private String course;

    private String studySetTitle;

    public GroupStudySetDto() {

    }

    public GroupStudySetDto(Long id, Long groupId, String title, String course, Long studySetId, String studySetTitle) {
        this.id = id;
        this.groupId = groupId;
        this.title = title;
        this.course = course;
        this.studySetId = studySetId;
        this.studySetTitle = studySetTitle;
    }

    public Long getId() {
        return id;
    }

    public Long getGroupId() {
        return groupId;
    }

    public Long getStudySetId() {
        return studySetId;
    }

    public String getTitle() {
        return title;
    }

    public String getCourse() {
        return course;
    }

    public String getStudySetTitle() {
        return studySetTitle;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public void setStudySetId(Long studySetId) {
        this.studySetId = studySetId;
    }

    public void setStudySetTitle(String studySetTitle) {
        this.studySetTitle = studySetTitle;
    }
}
