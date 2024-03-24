package com.hart.meliorem.goals.dto;

import java.sql.Timestamp;

import com.hart.meliorem.goals.GoalType;

public class GoalDto {
    private Long id;

    private Long userId;

    private Timestamp createdAt;

    private Timestamp updatedAt;

    private String goalDesc;

    private String goalTitle;

    private GoalType goalType;

    private Boolean isCompleted;

    private Timestamp targetCompletionDate;

    public GoalDto() {

    }

    public GoalDto(
            Long id,
            Long userId,
            Timestamp createdAt,
            Timestamp updatedAt,
            String goalDesc,
            String goalTitle,
            GoalType goalType,
            Boolean isCompleted,
            Timestamp targetCompletionDate

    ) {

        this.id = id;
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.goalDesc = goalDesc;
        this.goalTitle = goalTitle;
        this.goalType = goalType;
        this.isCompleted = isCompleted;
        this.targetCompletionDate = targetCompletionDate;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getGoalDesc() {
        return goalDesc;
    }

    public String getGoalTitle() {
        return goalTitle;
    }

    public GoalType getGoalType() {
        return goalType;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Boolean getIsCompleted() {
        return isCompleted;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public Timestamp getTargetCompletionDate() {
        return targetCompletionDate;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setGoalDesc(String goalDesc) {
        this.goalDesc = goalDesc;
    }

    public void setGoalTitle(String goalTitle) {
        this.goalTitle = goalTitle;
    }

    public void setGoalType(GoalType goalType) {
        this.goalType = goalType;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setIsCompleted(Boolean isCompleted) {
        this.isCompleted = isCompleted;
    }

    public void setTargetCompletionDate(Timestamp targetCompletionDate) {
        this.targetCompletionDate = targetCompletionDate;
    }
}
