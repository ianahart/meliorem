package com.hart.meliorem.goals.request;

public class MarkGoalCompleteRequest {

    private Boolean isCompleted;

    public MarkGoalCompleteRequest() {

    }

    public MarkGoalCompleteRequest(Boolean isCompleted) {
        this.isCompleted = isCompleted;
    }

    public Boolean getIsCompleted() {
        return isCompleted;
    }

    public void setIsCompleted(Boolean isCompleted) {
        this.isCompleted = isCompleted;
    }
}
