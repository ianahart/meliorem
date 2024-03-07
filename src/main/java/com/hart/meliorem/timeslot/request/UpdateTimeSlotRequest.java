package com.hart.meliorem.timeslot.request;

public class UpdateTimeSlotRequest {

    private Integer day;

    public UpdateTimeSlotRequest() {

    }

    public UpdateTimeSlotRequest(Integer day) {
        this.day = day;
    }

    public Integer getDay() {
        return day;
    }

    public void setDay(Integer day) {
        this.day = day;
    }
}
