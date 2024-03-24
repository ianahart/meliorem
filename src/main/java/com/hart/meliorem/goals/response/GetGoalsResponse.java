package com.hart.meliorem.goals.response;

import com.hart.meliorem.goals.dto.GoalDto;
import com.hart.meliorem.pagination.dto.PaginationDto;

public class GetGoalsResponse {

    private String message;

    private PaginationDto<GoalDto> data;

    public GetGoalsResponse() {

    }

    public GetGoalsResponse(String message, PaginationDto<GoalDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public PaginationDto<GoalDto> getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(PaginationDto<GoalDto> data) {
        this.data = data;
    }
}
