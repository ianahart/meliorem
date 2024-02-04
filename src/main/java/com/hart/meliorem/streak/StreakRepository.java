package com.hart.meliorem.streak;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hart.meliorem.streak.dto.StreakDto;

public interface StreakRepository extends JpaRepository<Streak, Long> {

    @Query(value = """
              SELECT s FROM Streak s
              INNER JOIN s.studySet ss
              INNER JOIN s.user u
              WHERE u.id = :userId
              AND s.day = :day
              AND s.month = :month
              AND s.year = :year
            """)
    List<Streak> findStreaksLessThanOneDayOld(@Param("userId") Long userId,
            @Param("day") Integer day, @Param("month") String month, @Param("year") Integer year);

    @Query(value = """
            SELECT new com.hart.meliorem.streak.dto.StreakDto(
            s.id AS id, s.createdAt AS createdAt, s.day AS day,
            s.dayOfWeek AS dayOfWeek, s.month AS month, s.year AS year,
            s.timestamp AS timestamp
            ) FROM Streak s
                INNER JOIN s.user u
                WHERE u.id = :userId
                AND s.createdAt BETWEEN :oneWeekAgo AND :now
                      """)
    List<StreakDto> findAllStreaksByUserId(@Param("userId") Long userId, @Param("oneWeekAgo") Timestamp oneWeekAgo,
            @Param("now") Timestamp now);
}
