package com.hart.meliorem.streak;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hart.meliorem.studyset.StudySet;
import com.hart.meliorem.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "streak")
public class Streak {

    @Id
    @SequenceGenerator(name = "streak_sequence", sequenceName = "streak_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "streak_sequence")
    @Column(name = "id")
    private Long id;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "day_of_week")
    private String dayOfWeek;

    @Column(name = "day")
    private Integer day;

    @Column(name = "month")
    private String month;

    @Column(name = "year")
    private Integer year;

    @Column(name = "timestamp")
    private Long timestamp;

    @ManyToOne()
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne()
    @JoinColumn(name = "studyset_id", referencedColumnName = "id")
    private StudySet studySet;

    public Streak() {

    }

    public Streak(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            Integer day,
            String dayOfWeek,
            String month,
            Integer year,
            Long timestamp) {

        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.day = day;
        this.month = month;
        this.year = year;
        this.timestamp = timestamp;
    }

    public Streak(Integer day, String month, Integer year, String dayOfWeek, Long timestamp, User user,
            StudySet studySet) {
        this.day = day;
        this.month = month;
        this.year = year;
        this.dayOfWeek = dayOfWeek;
        this.timestamp = timestamp;
        this.user = user;
        this.studySet = studySet;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getMonth() {
        return month;
    }

    public Integer getYear() {
        return year;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public Integer getDay() {
        return day;
    }

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public StudySet getStudySet() {
        return studySet;
    }

    public void setDay(Integer day) {
        this.day = day;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public void setStudySet(StudySet studySet) {
        this.studySet = studySet;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }
}
