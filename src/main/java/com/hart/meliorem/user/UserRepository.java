package com.hart.meliorem.user;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hart.meliorem.user.dto.InviteeDto;
import com.hart.meliorem.user.dto.SearchUserDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = """
            SELECT COUNT(u.id) FROM User u
            """)
    Long countUsers();

    Optional<User> findByEmail(String email);

    @Modifying
    @Query(value = """
            update User u set u.loggedIn = :loggedIn WHERE u.id = :userId
            """)
    void updateLoggedIn(@Param("userId") Long userId, @Param("loggedIn") Boolean loggedIn);

    @Query(value = """
            SELECT new com.hart.meliorem.user.dto.InviteeDto(
             u.id AS userId, u.fullName AS fullName, p.avatarUrl AS avatarUrl,
             p.schoolName AS schoolName, u.firstName AS firstName,
             u.createdAt AS createdAt
            ) FROM User u
            INNER JOIN u.profile p
            WHERE u.id NOT IN :groupMembersIds
            AND u.id <> :adminId
            AND u.role <> 'ADMIN'
                """)
    Page<InviteeDto> getInvitees(
            @Param("adminId") Long adminId,
            @Param("pageable") Pageable pageable,
            @Param("groupMembersIds") List<Long> groupMembersIds);

    @Query(value = """
            SELECT new com.hart.meliorem.user.dto.SearchUserDto(
             u.id AS id, p.avatarUrl AS avatarUrl, p.schoolName AS schoolName,
             u.fullName AS fullName
            ) FROM User u
            INNER JOIN u.profile p
            WHERE u.id NOT IN :groupMemberIds
            AND LOWER(u.fullName) LIKE %:fullName%
            AND u.role <> 'ADMIN'
            """)
    Page<SearchUserDto> queryUsersByFullName(@Param("fullName") String fullName,
            @Param("groupMemberIds") List<Long> groupMemberIds, @Param("pageable") Pageable pageable);
}
