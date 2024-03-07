package com.hart.meliorem.studyplan.dto;

public class TimeDto {

    private String startTime;

    private String endTime;

    public TimeDto() {

    }

    public TimeDto(String startTime, String endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }
}
