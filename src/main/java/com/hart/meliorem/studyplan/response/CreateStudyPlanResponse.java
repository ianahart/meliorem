package com.hart.meliorem.studyplan.response;

public class CreateStudyPlanResponse {

    private String message;

    public CreateStudyPlanResponse() {

    }

    public CreateStudyPlanResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
