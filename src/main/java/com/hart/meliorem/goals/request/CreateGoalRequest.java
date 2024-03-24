package com.hart.meliorem.goals.request;

import java.sql.Timestamp;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Size;

public class CreateGoalRequest {

    @FutureOrPresent(message = "Goal completion date must be in the present or future")
    private Timestamp goalCompletionDate;

    @Size(min = 1, max = 300, message = "Goal desc must be between 1 and 300 characters")
    private String goalDesc;

    @Size(min = 1, max = 50, message = "Goal title must be between 1 and 50 characters")
    private String goalTitle;

    private String goalType;

    public CreateGoalRequest() {

    }

    public CreateGoalRequest(
            Timestamp goalCompletionDate,
            String goalDesc,
            String goalTitle,
            String goalType) {
        this.goalCompletionDate = goalCompletionDate;
        this.goalDesc = goalDesc;
        this.goalTitle = goalTitle;
        this.goalType = goalType;
    }

    public String getGoalDesc() {
        return goalDesc;
    }

    public String getGoalType() {
        return goalType;
    }

    public String getGoalTitle() {
        return goalTitle;
    }

    public Timestamp getGoalCompletionDate() {
        return goalCompletionDate;
    }

    public void setGoalDesc(String goalDesc) {
        this.goalDesc = goalDesc;
    }

    public void setGoalType(String goalType) {
        this.goalType = goalType;
    }

    public void setGoalTitle(String goalTitle) {
        this.goalTitle = goalTitle;
    }

    public void setGoalCompletionDate(Timestamp goalCompletionDate) {
        this.goalCompletionDate = goalCompletionDate;
    }
}
