package com.hart.meliorem.timeslot;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hart.meliorem.timeslot.dto.TimeSlotDto;

@Repository
public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {

    @Query(value = """
                SELECT EXISTS(SELECT 1 FROM TimeSlot ts
                INNER JOIN ts.user u
                WHERE u.id = :userId
                AND ts.day = :day
               )
            """)

    boolean checkIfDayIsTaken(@Param("userId") Long userId, @Param("day") Integer day);

    @Query(value = """
              SELECT new com.hart.meliorem.timeslot.dto.TimeSlotDto(
                ts.id AS id, ts.day AS day, ts.title AS title, ts.startTime AS startTime,
                ts.endTime AS endTime
              ) FROM TimeSlot ts
              INNER JOIN ts.user u
              WHERE u.id = :userId
            """)
    List<TimeSlotDto> getTimeSlotsByUserId(@Param("userId") Long userId);
}
