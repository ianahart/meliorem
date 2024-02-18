package com.hart.meliorem.groupstudyset;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hart.meliorem.groupstudyset.dto.GroupStudySetDto;

@Repository
public interface GroupStudySetRepository extends JpaRepository<GroupStudySet, Long> {

    @Query(value = """
            SELECT EXISTS(SELECT 1 FROM GroupStudySet gss
            INNER JOIN gss.group g
            INNER JOIN gss.studySet ss
            WHERE g.id = :groupId
            AND ss.id = :studySetId
            )
            """)
    boolean getGroupStudySetByGroupIdAndStudySetId(@Param("studySetId") Long studySetId,
            @Param("groupId") Long groupId);

    @Query(value = """
            SELECT new com.hart.meliorem.groupstudyset.dto.GroupStudySetDto(
            gss.id AS id, g.id AS groupId, ss.title AS title, ss.course AS course, ss.id AS studySetId,
            ss.title AS studySetTitle
            ) FROM GroupStudySet gss
            INNER JOIN gss.group g
            INNER JOIN gss.studySet ss
            WHERE g.id = :groupId
                """)

    Page<GroupStudySetDto> getGroupStudySetsByGroupId(@Param("groupId") Long groupId,
            @Param("pageable") Pageable pageable);
}
