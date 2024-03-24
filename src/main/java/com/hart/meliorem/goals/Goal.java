package com.hart.meliorem.goals;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hart.meliorem.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;

@Entity()
@Table(name = "goal")
public class Goal {

    @Id
    @SequenceGenerator(name = "goal_sequence", sequenceName = "goal_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "goal_sequence")
    @Column(name = "id")
    private Long id;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "goal_title", length = 50)
    private String goalTitle;

    @Column(name = "goal_desc", length = 300)
    private String goalDesc;

    @Column(name = "target_completion_date")
    private Timestamp targetCompletionDate;

    @Column(name = "is_completed")
    private Boolean isCompleted;

    @Enumerated(EnumType.STRING)
    private GoalType goalType;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Goal() {

    }

    public Goal(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            String goalTitle,
            String goalDesc,
            Timestamp targetCompletionDate,
            Boolean isCompleted,
            GoalType goalType) {

        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.goalTitle = goalTitle;
        this.goalDesc = goalDesc;
        this.targetCompletionDate = targetCompletionDate;
        this.isCompleted = isCompleted;
        this.goalType = goalType;
    }

    public Goal(
            String goalTitle,
            String goalDesc,
            Timestamp targetCompletionDate,
            Boolean isCompleted,
            GoalType goalType,
            User user) {

        this.goalTitle = goalTitle;
        this.goalDesc = goalDesc;
        this.targetCompletionDate = targetCompletionDate;
        this.isCompleted = isCompleted;
        this.goalType = goalType;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
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

    public void setUser(User user) {
        this.user = user;
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
