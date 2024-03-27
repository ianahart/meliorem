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

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((createdAt == null) ? 0 : createdAt.hashCode());
        result = prime * result + ((updatedAt == null) ? 0 : updatedAt.hashCode());
        result = prime * result + ((dayOfWeek == null) ? 0 : dayOfWeek.hashCode());
        result = prime * result + ((day == null) ? 0 : day.hashCode());
        result = prime * result + ((month == null) ? 0 : month.hashCode());
        result = prime * result + ((year == null) ? 0 : year.hashCode());
        result = prime * result + ((timestamp == null) ? 0 : timestamp.hashCode());
        result = prime * result + ((user == null) ? 0 : user.hashCode());
        result = prime * result + ((studySet == null) ? 0 : studySet.hashCode());
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
        Streak other = (Streak) obj;
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
        if (dayOfWeek == null) {
            if (other.dayOfWeek != null)
                return false;
        } else if (!dayOfWeek.equals(other.dayOfWeek))
            return false;
        if (day == null) {
            if (other.day != null)
                return false;
        } else if (!day.equals(other.day))
            return false;
        if (month == null) {
            if (other.month != null)
                return false;
        } else if (!month.equals(other.month))
            return false;
        if (year == null) {
            if (other.year != null)
                return false;
        } else if (!year.equals(other.year))
            return false;
        if (timestamp == null) {
            if (other.timestamp != null)
                return false;
        } else if (!timestamp.equals(other.timestamp))
            return false;
        if (user == null) {
            if (other.user != null)
                return false;
        } else if (!user.equals(other.user))
            return false;
        if (studySet == null) {
            if (other.studySet != null)
                return false;
        } else if (!studySet.equals(other.studySet))
            return false;
        return true;
    }

}
