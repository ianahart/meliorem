package com.hart.meliorem.topic.response;

import java.util.List;

import com.hart.meliorem.topic.dto.TopicDto;

public class GetTopicResponse {

    private String message;

    private List<TopicDto> data;

    public GetTopicResponse() {

    }

    public GetTopicResponse(String message, List<TopicDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public List<TopicDto> getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(List<TopicDto> data) {
        this.data = data;
    }
}
