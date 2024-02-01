package com.hart.meliorem.studyset.request;

import java.util.List;

import com.hart.meliorem.studysetcard.dto.StudySetCardDto;
import com.hart.meliorem.studysetcard.dto.StudySetCardFullDto;

import jakarta.validation.constraints.Size;

public class EditStudySetRequest {

    private String visibility;

    @Size(min = 1, max = 200, message = "Title must be between 1 and 200 characters")
    private String title;

    @Size(min = 1, max = 250, message = "School name must be between 1 and 200 characters")
    private String schoolName;

    @Size(min = 1, max = 200, message = "Folder must be between 1 and 200 characters")
    private String folder;

    @Size(min = 1, max = 350, message = "Description must be between 1 and 200 characters")
    private String description;

    @Size(min = 1, max = 200, message = "Course must be between 1 and 200 characters")
    private String course;

    private List<StudySetCardFullDto> cards;

    public EditStudySetRequest() {

    }

    public EditStudySetRequest(
            String visibility,
            String title,
            String schoolName,
            String folder,
            String description,
            String course,
            List<StudySetCardFullDto> cards) {

        this.visibility = visibility;
        this.title = title;
        this.schoolName = schoolName;
        this.folder = folder;
        this.description = description;
        this.course = course;
        this.cards = cards;
    }

    public String getVisibility() {
        return visibility;
    }

    public void setVisibility(String visibility) {
        this.visibility = visibility;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public String getFolder() {
        return folder;
    }

    public void setFolder(String folder) {
        this.folder = folder;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public List<StudySetCardFullDto> getCards() {
        return cards;
    }

    public void setCards(List<StudySetCardFullDto> cards) {
        this.cards = cards;
    }

}
