package com.hart.meliorem.studyset.dto;

import java.util.List;

import com.hart.meliorem.studysetcard.dto.StudySetCardFullDto;

public class StudySetPopulateDto {

    private String folder;

    private String title;

    private String description;

    private String schoolName;

    private String course;

    private List<StudySetCardFullDto> cards;

    public StudySetPopulateDto() {

    }

    public StudySetPopulateDto(
            String folder,
            String title,
            String description,
            String schoolName,
            String course) {
        this.folder = folder;
        this.title = title;
        this.description = description;
        this.schoolName = schoolName;
        this.course = course;
    }

    public String getTitle() {
        return title;
    }

    public String getCourse() {
        return course;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public String getFolder() {
        return folder;
    }

    public String getDescription() {
        return description;
    }

    public List<StudySetCardFullDto> getCards() {
        return cards;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public void setFolder(String folder) {
        this.folder = folder;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCards(List<StudySetCardFullDto> cards) {
        this.cards = cards;
    }
}
