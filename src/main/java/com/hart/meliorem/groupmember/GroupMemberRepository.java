package com.hart.meliorem.groupmember;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hart.meliorem.group.dto.GroupDto;
import com.hart.meliorem.groupmember.dto.GroupMemberDto;
import com.hart.meliorem.groupmember.dto.GroupMemberInviteDto;

@Repository
public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {

    @Query(value = """
            SELECT new com.hart.meliorem.groupmember.dto.GroupMemberInviteDto(
             gm.id AS groupMemberId, g.id AS groupId, g.name AS groupName,
             i.fullName AS fullName, gm.createdAt AS createdAt
            ) FROM GroupMember gm
            INNER JOIN gm.inviter i
            INNER JOIN gm.group g
            INNER JOIN gm.member m
            WHERE m.id = :userId
            AND gm.accepted = :isAccepted
            """)
    Page<GroupMemberInviteDto> getGroupInvitesByUserId(@Param("isAccepted") Boolean isAccepted,
            @Param("userId") Long userId, @Param("pageable") Pageable pageable);

    @Query(value = """
              SELECT m.id FROM GroupMember gm
                INNER JOIN gm.group g
                INNER JOIN gm.member m
                WHERE g.id = :groupId
            """)
    List<Long> getGroupMembersIdByGroupId(@Param("groupId") Long groupId);

    @Query(value = """
             SELECT new com.hart.meliorem.group.dto.GroupDto(
              g.name AS name, g.id AS id, i.id AS adminId
             ) FROM GroupMember gm
             INNER JOIN gm.group g
             INNER JOIN gm.inviter i
             INNER JOIN gm.member m
             WHERE m.id = :memberId
             AND gm.accepted = true
            """)
    Page<GroupDto> getGroupsForGroupMember(@Param("memberId") Long memberId, @Param("pageable") Pageable pageable);

    @Query(value = """
            SELECT new com.hart.meliorem.groupmember.dto.GroupMemberDto(
            gm.id AS id, m.id AS userId, p.avatarUrl AS avatarUrl, p.schoolName AS schoolName,
            m.fullName AS fullName
            ) FROM GroupMember gm
            INNER JOIN gm.member m
            INNER JOIN gm.member.profile p
            INNER JOIN gm.group g
            WHERE g.id = :groupId
            AND gm.accepted = :accepted
                """)
    Page<GroupMemberDto> getGroupMembersByGroupId(@Param("groupId") Long groupID, @Param("accepted") Boolean accepted,
            @Param("pageable") Pageable pageable);

    @Query(value = """
            SELECT gm.id FROM GroupMember gm
            INNER JOIN gm.member m
            INNER JOIN gm.group g
            WHERE m.id = :userId
            AND g.id = :groupId
            """)

    Long findGroupMemberByUserIdAndGroupId(@Param("userId") Long userId, @Param("groupId") Long groupId);

    @Query(value = """
            SELECT gm.id FROM GroupMember gm
            INNER JOIN gm.inviter i
            INNER JOIN gm.group g
            WHERE i.id = :userId
            AND g.id = :groupId
            """)

    List<Long> findGroupMembersByUserIdAndGroupId(@Param("userId") Long userId, @Param("groupId") Long groupId);

}
