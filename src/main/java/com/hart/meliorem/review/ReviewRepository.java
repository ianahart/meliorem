package com.hart.meliorem.review;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query(value = """
                SELECT AVG(r.rating) FROM Review r
                INNER JOIN r.studySet ss
                WHERE ss.id = :studySetId
            """)
    Float getAvgRatingByStudySetId(@Param("studySetId") Long studySetId);

    @Query(value = """
            SELECT COUNT(r.id) FROM Review r
            INNER JOIN r.studySet ss
            WHERE ss.id = :studySetId
            """)
    Long getTotalReviewsCount(@Param("studySetId") Long studySetId);
}
