package com.hart.meliorem.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.hart.meliorem.notification.dto.NotificationDto;
import com.hart.meliorem.notification.request.CreateNotificationRequest;

@Controller
public class NotificationWebSocketController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final NotificationService notificationService;

    @Autowired
    public NotificationWebSocketController(SimpMessagingTemplate simpMessagingTemplate,
            NotificationService notificationService) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.notificationService = notificationService;
    }

    @MessageMapping("private-notifications")
    public void receiveNotification(@Payload CreateNotificationRequest request) {
        NotificationDto notification = this.notificationService.createNotification(request);

        if (notification.getId() != null) {
            this.simpMessagingTemplate.convertAndSendToUser(String.valueOf(request.getUserId()), "notifications",
                    notification);
        }

    }
}
