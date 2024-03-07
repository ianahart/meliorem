package com.hart.meliorem.studyplan.dto;

public class DayDto {

    private Integer day;

    private String name;

    public DayDto() {

    }

    public DayDto(Integer day, String name) {
        this.day = day;
        this.name = name;
    }

    public Integer getDay() {
        return day;
    }

    public String getName() {
        return name;
    }

    public void setDay(Integer day) {
        this.day = day;
    }

    public void setName(String name) {
        this.name = name;
    }
}
