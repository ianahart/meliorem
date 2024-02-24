package com.hart.meliorem.streak.response;

import com.hart.meliorem.streak.dto.StreakStatDto;

public class GetStreakStatResponse {

    private String message;

    private StreakStatDto data;

    public GetStreakStatResponse() {

    }

    public GetStreakStatResponse(String message, StreakStatDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public StreakStatDto getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(StreakStatDto data) {
        this.data = data;
    }
}
