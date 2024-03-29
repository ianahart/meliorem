package com.hart.meliorem.datetime;

import java.sql.Timestamp;
import java.time.*;
import java.time.format.TextStyle;
import java.time.temporal.TemporalAdjuster;
import java.time.temporal.TemporalAdjusters;
import java.util.Date;
import java.util.Locale;

import org.springframework.stereotype.Service;

import com.hart.meliorem.datetime.dto.DateTimeDto;

@Service
public class DateTimeService {

    private int getDateTimeYear(LocalDate localDate) {
        return localDate.getYear();
    }

    private String getDateTimeMonth(LocalDate localDate) {
        int monthInt = localDate.getMonthValue();

        Month month = Month.of(monthInt);
        String monthDisplayName = month.getDisplayName(TextStyle.SHORT,
                Locale.ENGLISH);

        return monthDisplayName;
    }

    private int getDateTimeDayOfMonth(LocalDate localDate) {
        return localDate.getDayOfMonth();
    }

    private String getDateTimeDayOfWeek(LocalDate localDate) {

        DayOfWeek dayOfWeek = localDate.getDayOfWeek();
        return dayOfWeek.getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
    }

    private Long getDateTimeTimestamp() {
        return Instant.now().toEpochMilli();
    }

    public DateTimeDto getDateTimeDisplays() {
        Date date = new Date();
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        return new DateTimeDto(
                getDateTimeYear(localDate),
                getDateTimeMonth(localDate),
                getDateTimeDayOfMonth(localDate),
                getDateTimeDayOfWeek(localDate),
                getDateTimeTimestamp());
    }

    public Timestamp getDateTimeWeekAgo() {
        LocalDate now = LocalDate.now();
        LocalDate weekStart = now.minusDays(6);

        Timestamp timestamp = Timestamp.valueOf(weekStart.atStartOfDay());

        return timestamp;
    }

    public Timestamp getAMonthAgo(Integer year, Integer month) {
        LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate endOfMonth = startOfMonth.with(TemporalAdjusters.lastDayOfMonth());

        Timestamp timestamp = Timestamp.valueOf(endOfMonth.atStartOfDay());

        return timestamp;

    }
}
