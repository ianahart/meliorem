package com.hart.meliorem.timeslot.response;

import java.util.List;

import com.hart.meliorem.timeslot.dto.TimeSlotDto;

public class GetTimeSlotResponse {

    private String message;

    private List<TimeSlotDto> data;

    public GetTimeSlotResponse() {

    }

    public GetTimeSlotResponse(String message, List<TimeSlotDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public List<TimeSlotDto> getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(List<TimeSlotDto> data) {
        this.data = data;
    }
}
