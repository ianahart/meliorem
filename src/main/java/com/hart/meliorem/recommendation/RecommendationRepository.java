package com.hart.meliorem.recommendation;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hart.meliorem.recommendation.dto.RecommendationDto;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {

    Recommendation findFirstByUserIdOrderByCreatedAtDesc(Long userId);

    @Query(value = """
                SELECT new com.hart.meliorem.recommendation.dto.RecommendationDto(
                 ss.id AS id, u.id AS userId, p.avatarUrl AS avatarUrl, r.id AS recommendationId,
                 ss.createdAt AS createdAt, ss.course AS course, ss.description AS description,
                 ss.folder AS folder, ss.schoolName AS schoolName, ss.title AS title,
                 ss.visibility AS visibility, u.fullName AS fullName, r.lastGeneratedAt as lastGeneratedAt
                ) FROM Recommendation r
                INNER JOIN r.studySet ss
                INNER JOIN ss.user u
                INNER JOIN r.user ru
                INNER JOIN ss.user.profile p
                WHERE ru.id = :userId
            """)

    Page<RecommendationDto> getRecommendationsByUserId(@Param("userId") Long userId,
            @Param("pageable") Pageable pageable);

    @Query(value = """
                    SELECT EXISTS(SELECT 1 FROM Recommendation r
                    INNER JOIN r.user u
                    INNER JOIN r.studySet s
                    WHERE u.id = :userId
                    AND s.id = :studySetId)
            """)
    boolean checkRecommendationExists(@Param("userId") Long userId, @Param("studySetId") Long studySetId);
}
