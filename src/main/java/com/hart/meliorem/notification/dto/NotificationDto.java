package com.hart.meliorem.notification.dto;

import java.sql.Timestamp;

import com.hart.meliorem.notification.NotificationType;

public class NotificationDto {

    private Long id;

    private String text;

    private NotificationType notificationType;

    private Timestamp createdAt;

    public NotificationDto() {

    }

    public NotificationDto(
            Long id,
            String text,
            NotificationType notificationType,
            Timestamp createdAt) {
        this.id = id;
        this.text = text;
        this.notificationType = notificationType;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public NotificationType getNotificationType() {
        return notificationType;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setNotificationType(NotificationType notificationType) {
        this.notificationType = notificationType;
    }
}
