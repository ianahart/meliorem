package com.hart.meliorem.timeslot.dto;

public class TimeSlotDto {

    private Long id;

    private Integer day;

    private String title;

    private Integer startTime;

    private Integer endTime;

    public TimeSlotDto() {

    }

    public TimeSlotDto(
            Long id,
            Integer day,
            String title,
            Integer startTime,
            Integer endTime) {

        this.id = id;
        this.day = day;
        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public Long getId() {
        return id;
    }

    public Integer getDay() {
        return day;
    }

    public String getTitle() {
        return title;
    }

    public Integer getEndTime() {
        return endTime;
    }

    public Integer getStartTime() {
        return startTime;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDay(Integer day) {
        this.day = day;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setEndTime(Integer endTime) {
        this.endTime = endTime;
    }

    public void setStartTime(Integer startTime) {
        this.startTime = startTime;
    }

}
