package com.hart.meliorem.quiz.response;

import com.hart.meliorem.pagination.dto.PaginationDto;
import com.hart.meliorem.quiz.dto.QuizDto;

public class GetQuizzesResponse {

    private String message;

    private PaginationDto<QuizDto> data;

    public GetQuizzesResponse() {

    }

    public GetQuizzesResponse(String message, PaginationDto<QuizDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public PaginationDto<QuizDto> getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(PaginationDto<QuizDto> data) {
        this.data = data;
    }
}
