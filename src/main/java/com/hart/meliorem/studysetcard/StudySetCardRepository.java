package com.hart.meliorem.studysetcard;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StudySetCardRepository extends JpaRepository<StudySetCard, Long> {

    @Query(value = """
             SELECT COUNT(ssc.id) FROM StudySetCard ssc
             INNER JOIN ssc.studySet ss
            WHERE ss.id = :studySetId
            """)
    long countStudySetCardsByStudySetId(@Param("studySetId") Long studySetId);

}
