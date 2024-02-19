package com.hart.meliorem.groupmessage;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hart.meliorem.groupmessage.dto.GroupMessageDto;

@Repository
public interface GroupMessageRepository extends JpaRepository<GroupMessage, Long> {

    @Query(value = """
                SELECT new com.hart.meliorem.groupmessage.dto.GroupMessageDto(
                gm.message AS message, gm.id AS id, u.id AS userId, u.fullName AS fullName, gm.createdAt AS createdAt,
                p.avatarUrl AS avatarUrl, g.id AS groupId

                ) FROM GroupMessage gm
                INNER JOIN gm.group g
                INNER JOIN gm.user u
                INNER JOIN gm.user.profile p
                WHERE gm.id = :groupMessageId
            """)
    GroupMessageDto getGroupMessage(@Param("groupMessageId") Long groupMessageId);

    @Query(value = """
                SELECT new com.hart.meliorem.groupmessage.dto.GroupMessageDto(
                gm.message AS message, gm.id AS id, u.id AS userId, u.fullName AS fullName, gm.createdAt AS createdAt,
                p.avatarUrl AS avatarUrl, g.id AS groupId

                ) FROM GroupMessage gm
                INNER JOIN gm.group g
                INNER JOIN gm.user u
                INNER JOIN gm.user.profile p
                WHERE g.id = :groupId
                ORDER BY gm.id DESC LIMIT 50
            """)
    List<GroupMessageDto> getGroupMessages(@Param("groupId") Long groupId);

}
