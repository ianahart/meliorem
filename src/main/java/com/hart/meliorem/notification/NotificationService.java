package com.hart.meliorem.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hart.meliorem.datetime.DateTimeService;
import com.hart.meliorem.datetime.dto.DateTimeDto;
import com.hart.meliorem.notification.request.CreateNotificationRequest;
import com.hart.meliorem.pagination.PaginationService;
import com.hart.meliorem.pagination.dto.PaginationDto;
import com.hart.meliorem.streak.StreakService;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;
import com.hart.meliorem.notification.dto.NotificationDto;
import com.hart.meliorem.advice.NotFoundException;
import com.hart.meliorem.advice.ForbiddenException;

@Service
public class NotificationService {

    private final UserService userService;

    private final StreakService streakService;

    private final NotificationRepository notificationRepository;

    private final DateTimeService dateTimeService;

    private final PaginationService paginationService;

    @Autowired
    public NotificationService(UserService userService,
            StreakService streakService,
            NotificationRepository notificationRepository,
            DateTimeService dateTimeService,
            PaginationService paginationService) {
        this.userService = userService;
        this.streakService = streakService;
        this.notificationRepository = notificationRepository;
        this.dateTimeService = dateTimeService;
        this.paginationService = paginationService;
    }

    public PaginationDto<NotificationDto> getNotifications(Long userId, int page, int pageSize, String direction) {

        Pageable pageable = this.paginationService.getPageable(page, pageSize, direction);

        Page<NotificationDto> result = this.notificationRepository.getAllNotificationsByUserId(userId, pageable);

        return new PaginationDto<NotificationDto>(
                result.getContent(),
                result.getNumber(),
                pageSize,
                result.getTotalPages(),
                direction,
                result.getTotalElements());

    }

    private Notification getNotificationById(Long notificationId) {
        return this.notificationRepository
                .findById(notificationId)
                .orElseThrow(() -> new NotFoundException(
                        String.format("A notification with the id %d was not found", notificationId)));
    }

    public NotificationDto createNotification(CreateNotificationRequest request) {
        DateTimeDto dateTime = this.dateTimeService.getDateTimeDisplays();

        if (this.streakService.checkForExistingStreak(request.getUserId(), dateTime.getDay(),
                dateTime.getMonth(),
                dateTime.getYear())
                && NotificationType.STREAK == NotificationType.valueOf(request.getNotificationType())) {
            return new NotificationDto();

        }
        User user = this.userService.getUserById(request.getUserId());
        Notification notification = new Notification(user, request.getText(),
                NotificationType.valueOf(request.getNotificationType()));

        this.notificationRepository.save(notification);

        return new NotificationDto(
                notification.getId(),
                notification.getText(),
                notification.getNotificationType(),
                notification.getCreatedAt());

    }

    public void deleteNotification(Long notificationId) {

        User user = this.userService.getCurrentlyLoggedInUser();

        Notification notification = getNotificationById(notificationId);

        if (user.getId() != notification.getUser().getId()) {
            throw new ForbiddenException("Cannot remove another user's notification");
        }

        this.notificationRepository.delete(notification);
    }
}
