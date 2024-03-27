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

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((createdAt == null) ? 0 : createdAt.hashCode());
        result = prime * result + ((updatedAt == null) ? 0 : updatedAt.hashCode());
        result = prime * result + ((goalTitle == null) ? 0 : goalTitle.hashCode());
        result = prime * result + ((goalDesc == null) ? 0 : goalDesc.hashCode());
        result = prime * result + ((targetCompletionDate == null) ? 0 : targetCompletionDate.hashCode());
        result = prime * result + ((isCompleted == null) ? 0 : isCompleted.hashCode());
        result = prime * result + ((goalType == null) ? 0 : goalType.hashCode());
        result = prime * result + ((user == null) ? 0 : user.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Goal other = (Goal) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (createdAt == null) {
            if (other.createdAt != null)
                return false;
        } else if (!createdAt.equals(other.createdAt))
            return false;
        if (updatedAt == null) {
            if (other.updatedAt != null)
                return false;
        } else if (!updatedAt.equals(other.updatedAt))
            return false;
        if (goalTitle == null) {
            if (other.goalTitle != null)
                return false;
        } else if (!goalTitle.equals(other.goalTitle))
            return false;
        if (goalDesc == null) {
            if (other.goalDesc != null)
                return false;
        } else if (!goalDesc.equals(other.goalDesc))
            return false;
        if (targetCompletionDate == null) {
            if (other.targetCompletionDate != null)
                return false;
        } else if (!targetCompletionDate.equals(other.targetCompletionDate))
            return false;
        if (isCompleted == null) {
            if (other.isCompleted != null)
                return false;
        } else if (!isCompleted.equals(other.isCompleted))
            return false;
        if (goalType != other.goalType)
            return false;
        if (user == null) {
            if (other.user != null)
                return false;
        } else if (!user.equals(other.user))
            return false;
        return true;
    }


}
