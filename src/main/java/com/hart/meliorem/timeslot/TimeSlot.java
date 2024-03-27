package com.hart.meliorem.timeslot;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import com.hart.meliorem.studyplan.StudyPlan;
import com.hart.meliorem.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;

@Entity
@Table(name = "time_slot")
public class TimeSlot {

    @Id
    @SequenceGenerator(name = "time_slot_sequence", sequenceName = "time_slot_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "time_slot_sequence")
    @Column(name = "id")
    private Long id;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "day")
    private Integer day;

    @Column(name = "title")
    private String title;

    @Column(name = "start_time")
    private Integer startTime;

    @Column(name = "end_time")
    private Integer endTime;

    @ManyToOne()
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne()
    @JoinColumn(name = "study_plan_id", referencedColumnName = "id")
    private StudyPlan studyPlan;

    public TimeSlot() {

    }

    public TimeSlot(
            Long id,
            Timestamp createdAt,
            Integer day,
            String title,
            Integer startTime,
            Integer endTime) {
        this.id = id;
        this.createdAt = createdAt;
        this.day = day;
        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public TimeSlot(
            Integer day,
            String title,
            Integer startTime,
            Integer endTime,
            StudyPlan studyPlan,
            User user) {
        this.day = day;
        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
        this.studyPlan = studyPlan;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Integer getDay() {
        return day;
    }

    public Integer getEndTime() {
        return endTime;
    }

    public String getTitle() {
        return title;
    }

    public Integer getStartTime() {
        return startTime;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public StudyPlan getStudyPlan() {
        return studyPlan;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setDay(Integer day) {
        this.day = day;
    }

    public void setEndTime(Integer endTime) {
        this.endTime = endTime;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setStartTime(Integer startTime) {
        this.startTime = startTime;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setStudyPlan(StudyPlan studyPlan) {
        this.studyPlan = studyPlan;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((createdAt == null) ? 0 : createdAt.hashCode());
        result = prime * result + ((day == null) ? 0 : day.hashCode());
        result = prime * result + ((title == null) ? 0 : title.hashCode());
        result = prime * result + ((startTime == null) ? 0 : startTime.hashCode());
        result = prime * result + ((endTime == null) ? 0 : endTime.hashCode());
        result = prime * result + ((user == null) ? 0 : user.hashCode());
        result = prime * result + ((studyPlan == null) ? 0 : studyPlan.hashCode());
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
        TimeSlot other = (TimeSlot) obj;
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
        if (day == null) {
            if (other.day != null)
                return false;
        } else if (!day.equals(other.day))
            return false;
        if (title == null) {
            if (other.title != null)
                return false;
        } else if (!title.equals(other.title))
            return false;
        if (startTime == null) {
            if (other.startTime != null)
                return false;
        } else if (!startTime.equals(other.startTime))
            return false;
        if (endTime == null) {
            if (other.endTime != null)
                return false;
        } else if (!endTime.equals(other.endTime))
            return false;
        if (user == null) {
            if (other.user != null)
                return false;
        } else if (!user.equals(other.user))
            return false;
        if (studyPlan == null) {
            if (other.studyPlan != null)
                return false;
        } else if (!studyPlan.equals(other.studyPlan))
            return false;
        return true;
    }


}
