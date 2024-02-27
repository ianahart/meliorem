package com.hart.meliorem.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hart.meliorem.notification.response.DeleteNotificationResponse;
import com.hart.meliorem.notification.response.GetNotificationResponse;

@RestController
@RequestMapping(path = "/api/v1/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("")
    ResponseEntity<GetNotificationResponse> getNotifications(@RequestParam("userId") Long userId,
            @RequestParam("page") int page, @RequestParam("pageSize") int pageSize,
            @RequestParam("direction") String direction) {

        return ResponseEntity.status(HttpStatus.OK).body(new GetNotificationResponse("success",
                this.notificationService.getNotifications(userId, page, pageSize, direction)));
    }

    @DeleteMapping("/{notificationId}")
    ResponseEntity<DeleteNotificationResponse> deleteNotification(@PathVariable("notificationId") Long notificationId) {
        this.notificationService.deleteNotification(notificationId);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new DeleteNotificationResponse("success"));
    }

}
