package com.hart.meliorem.streak.response;

import java.util.List;

import com.hart.meliorem.streak.dto.StreakDto;

public class GetStreakResponse {

    private String message;

    private List<StreakDto> data;

    public GetStreakResponse() {

    }

    public GetStreakResponse(String message, List<StreakDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<StreakDto> getData() {
        return data;
    }

    public void setData(List<StreakDto> data) {
        this.data = data;
    }
}
