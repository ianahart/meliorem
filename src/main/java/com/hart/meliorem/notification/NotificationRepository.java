package com.hart.meliorem.notification;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hart.meliorem.notification.dto.NotificationDto;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query(value = """
                SELECT new com.hart.meliorem.notification.dto.NotificationDto(
                n.id AS id, n.text AS text, n.notificationType AS notificationType,
                n.createdAt AS createdAt
                ) FROM Notification n
                INNER JOIN n.user u
                WHERE u.id = :userId
            """)
    Page<NotificationDto> getAllNotificationsByUserId(@Param("userId") Long userId,
            @Param("pageable") Pageable pageable);
}
