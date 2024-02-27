package com.hart.meliorem.streak;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;

import com.hart.meliorem.advice.BadRequestException;
import com.hart.meliorem.datetime.DateTimeService;
import com.hart.meliorem.datetime.dto.DateTimeDto;
import com.hart.meliorem.streak.dto.StreakDto;
import com.hart.meliorem.streak.dto.StreakStatDto;
import com.hart.meliorem.studyset.StudySet;
import com.hart.meliorem.studyset.StudySetService;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;

@Service
public class StreakService {

    private final StreakRepository streakRepository;
    private final DateTimeService dateTimeService;
    private final UserService userService;
    private final StudySetService studySetService;

    @Autowired
    public StreakService(StreakRepository streakRepository,
            DateTimeService dateTimeService,
            UserService userService,
            StudySetService studySetService) {
        this.streakRepository = streakRepository;
        this.dateTimeService = dateTimeService;
        this.userService = userService;
        this.studySetService = studySetService;
    }

    public boolean checkForExistingStreak(Long userId, Integer day, String month, Integer year) {

        List<Streak> streaks = this.streakRepository.findStreaksLessThanOneDayOld(
                userId,
                day,
                month,
                year);

        return streaks.size() == 1;
    }

    public void createStreak(Long studySetId) {
        User user = this.userService.getCurrentlyLoggedInUser();

        DateTimeDto dateTime = this.dateTimeService.getDateTimeDisplays();

        if (checkForExistingStreak(user.getId(), dateTime.getDay(), dateTime.getMonth(), dateTime.getYear())) {
            throw new BadRequestException("Already scored a point in your streak today");
        }

        StudySet studySet = this.studySetService.findStudySetById(studySetId);

        Streak newStreak = new Streak(
                dateTime.getDay(),
                dateTime.getMonth(),
                dateTime.getYear(),
                dateTime.getDayOfWeek(),
                dateTime.getTimestamp(),
                user,
                studySet);

        this.streakRepository.save(newStreak);
    }

    public List<StreakDto> getStreaks(Long userId, String duration, Integer month, Integer year) {

        if (duration.equals("month")) {
            LocalDate startOfMonth = LocalDate.of(year, month, 1);
            Timestamp endOfMonth = this.dateTimeService.getAMonthAgo(year, month);
            return this.streakRepository.findAllStreaksByUserIdMonth(userId, endOfMonth,
                    Timestamp.valueOf(startOfMonth.atStartOfDay()));
        }

        if (duration.equals("week")) {
            Timestamp now = Timestamp.from(Instant.now());
            Timestamp oneWeekAgo = this.dateTimeService.getDateTimeWeekAgo();
            return this.streakRepository.findAllStreaksByUserIdWeek(userId, oneWeekAgo, now);
        }

        List<StreakDto> empty = new ArrayList<>();
        return empty;
    }

    public StreakStatDto getStreakStats(Long userId) {
        Long setsStudied = this.streakRepository.getSetsStudied(userId);
        Integer weeklyStreak = getStreaks(userId, "week", 0, 0).size();

        return new StreakStatDto(setsStudied, weeklyStreak);
    }
}
