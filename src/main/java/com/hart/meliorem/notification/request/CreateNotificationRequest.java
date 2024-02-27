package com.hart.meliorem.notification.request;

public class CreateNotificationRequest {

    private Long userId;

    private String text;

    private String notificationType;

    public CreateNotificationRequest() {

    }

    public CreateNotificationRequest(Long userId, String text, String notificationType) {
        this.userId = userId;
        this.text = text;
        this.notificationType = notificationType;
    }

    public String getText() {
        return text;
    }

    public Long getUserId() {
        return userId;
    }

    public String getNotificationType() {
        return notificationType;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setNotificationType(String notificationType) {
        this.notificationType = notificationType;
    }
}
