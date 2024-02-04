package com.hart.meliorem.studysetcard.request;

public class StarStudySetCardRequest {

    private Boolean starred;

    public StarStudySetCardRequest() {

    }

    public StarStudySetCardRequest(Boolean starred) {
          this.starred = starred;
    }

    public Boolean getStarred() {
        return starred;
    }

    public void setStarred(Boolean starred) {
        this.starred = starred;
    }
}
