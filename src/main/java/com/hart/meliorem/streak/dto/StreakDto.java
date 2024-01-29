package com.hart.meliorem.streak.dto;

import java.sql.Timestamp;

public class StreakDto {

    private Long id;

    private Timestamp createdAt;

    private Integer day;

    private String dayOfWeek;

    private String month;

    private Integer year;

    private Long timestamp;

    public StreakDto() {

    }

    public StreakDto(
            Long id,
            Timestamp createdAt,
            Integer day,
            String dayOfWeek,
            String month,
            Integer year,
            Long timestamp) {

        this.id = id;
        this.createdAt = createdAt;
        this.day = day;
        this.dayOfWeek = dayOfWeek;
        this.month = month;
        this.year = year;
        this.timestamp = timestamp;
    }

    public Long getId() {
        return id;
    }

    public Integer getDay() {
        return day;
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

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDay(Integer day) {
        this.day = day;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
}
