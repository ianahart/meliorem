package com.hart.meliorem.streak;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StreakRepository extends JpaRepository<Streak, Long> {

    @Query(value = """
              SELECT s FROM Streak s
              INNER JOIN s.studySet ss
              INNER JOIN s.user u
              WHERE ss.id = :studySetId
              AND u.id = :userId
              AND s.day = :day
              AND s.month = :month
              AND s.year = :year
            """)
    List<Streak> findStreaksLessThanOneDayOld(@Param("studySetId") Long studySetId, @Param("userId") Long userId,
            @Param("day") Integer day, @Param("month") String month, @Param("year") Integer year);
}
