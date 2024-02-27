package com.hart.meliorem.notification.response;

import com.hart.meliorem.notification.dto.NotificationDto;
import com.hart.meliorem.pagination.dto.PaginationDto;

public class GetNotificationResponse {

    private String message;

    private PaginationDto<NotificationDto> data;

    public GetNotificationResponse() {

    }

    public GetNotificationResponse(String message, PaginationDto<NotificationDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public PaginationDto<NotificationDto> getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(PaginationDto<NotificationDto> data) {
        this.data = data;
    }
}
