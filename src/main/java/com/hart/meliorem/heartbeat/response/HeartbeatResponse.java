package com.hart.meliorem.heartbeat.response;

public class HeartbeatResponse {

    private String message;

    public HeartbeatResponse() {

    }

    public HeartbeatResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
