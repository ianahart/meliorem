package com.hart.meliorem.studyset.dto;

public class StudySetMinDto {

    private Long id;

    private String course;

    private String folder;

    private String schoolName;

    public StudySetMinDto() {

    }

    public StudySetMinDto(Long id, String course, String folder, String schoolName) {
        this.id = id;
        this.course = course;
        this.folder = folder;
        this.schoolName = schoolName;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public Long getId() {
        return id;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public String getCourse() {
        return course;
    }

    public String getFolder() {
        return folder;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public void setFolder(String folder) {
        this.folder = folder;
    }

}
