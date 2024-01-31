package com.hart.meliorem.studysetcard;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hart.meliorem.studysetcard.dto.StudySetCardDto;

public interface StudySetCardRepository extends JpaRepository<StudySetCard, Long> {

    @Query(value = """
             SELECT COUNT(ssc.id) FROM StudySetCard ssc
             INNER JOIN ssc.studySet ss
            WHERE ss.id = :studySetId
            """)
    long countStudySetCardsByStudySetId(@Param("studySetId") Long studySetId);

    @Query(value = """
                SELECT new com.hart.meliorem.studysetcard.dto.StudySetCardDto(
                 ssc.number AS number, ssc.order AS order, ssc.term AS term,
                ssc.image AS image, ssc.definition AS definition, ssc.color AS color,
                ssc.bgColor AS bgColor
                ) FROM StudySetCard ssc
                INNER JOIN ssc.studySet ss
                WHERE ss.id = :studySetId

            """)
    List<StudySetCardDto> getStudySetCardsByStudySetId(@Param("studySetId") Long studySetId);

}
