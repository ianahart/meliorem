package com.hart.meliorem.studysetcard.request;

import jakarta.validation.constraints.Size;

public class EditStudySetCardRequest {

    @Size(min = 1, max = 50, message = "Term must be between 1 and 50 characters")
    private String term;

    @Size(min = 1, max = 300, message = "Definition must be between 1 and 300 characters")
    private String definition;

    public EditStudySetCardRequest() {

    }

    public EditStudySetCardRequest(String term, String definition) {
        this.term = term;
        this.definition = definition;
    }

    public String getTerm() {
        return term;
    }

    public String getDefinition() {
        return definition;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public void setDefinition(String definition) {
        this.definition = definition;
    }
}
