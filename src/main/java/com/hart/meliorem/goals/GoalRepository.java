package com.hart.meliorem.goals;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hart.meliorem.goals.dto.GoalDto;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {

    @Query(value = """
                    SELECT new com.hart.meliorem.goals.dto.GoalDto(
                    g.id AS id, u.id AS userId, g.createdAt AS createdAt,
                    g.updatedAt AS updatedAt, g.goalDesc AS goalDesc,
                    g.goalTitle AS goalTitle, g.goalType AS goalType,
                    g.isCompleted AS isCompleted, g.targetCompletionDate AS targetCompletionDate
                    ) FROM Goal g
                    INNER JOIN g.user u
                    WHERE u.id = :userId
                    AND g.goalType = :goalType
                    AND g.isCompleted = :completion
            """)
    Page<GoalDto> getGoalsByFilter(@Param("pageable") Pageable pageable,
            @Param("goalType") GoalType goalType,
            @Param("completion") Boolean completion,
            @Param("userId") Long userId);

    @Query(value = """
                    SELECT new com.hart.meliorem.goals.dto.GoalDto(
                    g.id AS id, u.id AS userId, g.createdAt AS createdAt,
                    g.updatedAt AS updatedAt, g.goalDesc AS goalDesc,
                    g.goalTitle AS goalTitle, g.goalType AS goalType,
                    g.isCompleted AS isCompleted, g.targetCompletionDate AS targetCompletionDate
                    ) FROM Goal g
                    INNER JOIN g.user u
                    WHERE u.id = :userId
            """)
    Page<GoalDto> getGoalsByDefault(@Param("pageable") Pageable pageable, @Param("userId") Long userId);

    @Query(value = """
                SELECT new com.hart.meliorem.goals.dto.GoalDto(
                g.id AS id, u.id AS userId, g.createdAt AS createdAt,
                g.updatedAt AS updatedAt, g.goalDesc AS goalDesc,
                g.goalTitle AS goalTitle, g.goalType AS goalType,
                g.isCompleted AS isCompleted, g.targetCompletionDate AS targetCompletionDate
                ) FROM Goal g
                INNER JOIN g.user u
                WHERE g.id = :goalId
            """)
    GoalDto getNewGoalByGoalId(@Param("goalId") Long goalId);
}
