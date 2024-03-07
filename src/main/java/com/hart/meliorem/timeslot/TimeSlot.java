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
}
