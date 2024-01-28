package com.hart.meliorem.streak;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.hart.meliorem.advice.BadRequestException;
import com.hart.meliorem.datetime.DateTimeService;
import com.hart.meliorem.datetime.dto.DateTimeDto;
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

    public void createStreak(Long studySetId) {
        User user = this.userService.getCurrentlyLoggedInUser();

        DateTimeDto dateTime = this.dateTimeService.getDateTimeDisplays();

        List<Streak> streaks = this.streakRepository.findStreaksLessThanOneDayOld(
                studySetId,
                user.getId(),
                dateTime.getDay(),
                dateTime.getMonth(),
                dateTime.getYear());
        if (streaks.size() == 1) {
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

}
