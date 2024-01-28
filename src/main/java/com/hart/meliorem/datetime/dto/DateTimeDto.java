package com.hart.meliorem.datetime.dto;

public class DateTimeDto {

    private Integer year;

    private String month;

    private Integer day;

    private String dayOfWeek;

    private Long timestamp;

    public DateTimeDto() {

    }

    public DateTimeDto(Integer year, String month, Integer day, String dayOfWeek, Long timestamp) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.dayOfWeek = dayOfWeek;
        this.timestamp = timestamp;
    }

    public Integer getDay() {
        return day;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public Integer getYear() {
        return year;
    }

    public String getMonth() {
        return month;
    }

    public String getDayOfWeek() {
        return dayOfWeek;
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
}
