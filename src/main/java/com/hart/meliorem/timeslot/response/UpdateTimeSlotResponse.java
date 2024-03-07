package com.hart.meliorem.timeslot.response;

public class UpdateTimeSlotResponse {

    private String message;

    public UpdateTimeSlotResponse() {

    }

    public UpdateTimeSlotResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
