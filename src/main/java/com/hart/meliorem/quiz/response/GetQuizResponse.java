package com.hart.meliorem.quiz.response;

import com.hart.meliorem.quiz.dto.GetQuizDto;

public class GetQuizResponse {

    private String message;

    private GetQuizDto data;

    public GetQuizResponse() {

    }

    public GetQuizResponse(String message, GetQuizDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public GetQuizDto getData() {
        return data;
    }

    public void setData(GetQuizDto data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
