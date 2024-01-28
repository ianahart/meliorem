package com.hart.meliorem.studyset;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hart.meliorem.studyset.dto.StudySetDto;

public interface StudySetRepository extends JpaRepository<StudySet, Long> {
    @Query(value = """
            SELECT DISTINCT ss.folder FROM StudySet ss
                 INNER JOIN ss.user u
                 WHERE u.id = :userId
                 AND LOWER(ss.folder) LIKE %:query%
                """)
    Page<String> findAllDistinctFoldersByUserId(@Param("userId") Long userId, @Param("query") String query,
            @Param("pageable") Pageable pageable);

    @Query(value = """
            SELECT new com.hart.meliorem.studyset.dto.StudySetDto(
             u.id AS userId, p.avatarUrl AS avatarUrl, ss.id AS id,
             ss.createdAt AS createdAt, ss.course AS course, ss.description AS description,
             ss.folder AS folder, ss.schoolName AS schoolName, ss.title AS title,
             ss.visibility AS visibility, u.fullName AS fullName
            ) FROM StudySet ss
            INNER JOIN ss.user u
            INNER JOIN ss.user.profile p
            WHERE u.id = :userId
            """)
    Page<StudySetDto> findAllStudySetsByUserId(@Param("userId") Long userId, @Param("pageable") Pageable pageable);

    @Query(value = """
            SELECT new com.hart.meliorem.studyset.dto.StudySetDto(
             u.id AS userId, p.avatarUrl AS avatarUrl, ss.id AS id,
             ss.createdAt AS createdAt, ss.course AS course, ss.description AS description,
             ss.folder AS folder, ss.schoolName AS schoolName, ss.title AS title,
             ss.visibility AS visibility, u.fullName AS fullName
            ) FROM StudySet ss
            INNER JOIN ss.user u
            INNER JOIN ss.user.profile p
            """)
    Page<StudySetDto> findAllStudySets(@Param("pageable") Pageable pageable);

}
