package com.hart.meliorem.goals.response;

import com.hart.meliorem.goals.dto.GoalDto;

public class GetGoalResponse {

    private String message;

    private GoalDto data;

    public GetGoalResponse() {

    }

    public GetGoalResponse(String message, GoalDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public GoalDto getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(GoalDto data) {
        this.data = data;
    }
}
