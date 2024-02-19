package com.hart.meliorem.groupmessage.response;

import java.util.List;

import com.hart.meliorem.groupmessage.dto.GroupMessageDto;

public class GetGroupMessagesResponse {

    private String message;

    private List<GroupMessageDto> data;

    public GetGroupMessagesResponse() {

    }

    public GetGroupMessagesResponse(String message, List<GroupMessageDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public List<GroupMessageDto> getData() {
        return data;
    }

    public void setData(List<GroupMessageDto> data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
