package com.hart.meliorem.timeslot;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hart.meliorem.advice.BadRequestException;
import com.hart.meliorem.advice.NotFoundException;
import com.hart.meliorem.studyplan.StudyPlan;
import com.hart.meliorem.studyplan.dto.DayDto;
import com.hart.meliorem.studyplan.dto.TimeDto;
import com.hart.meliorem.timeslot.dto.TimeSlotDto;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;

@Service
public class TimeSlotService {

    private final TimeSlotRepository timeSlotRepository;

    private final UserService userService;

    @Autowired
    public TimeSlotService(TimeSlotRepository timeSlotRepository,
            UserService userService) {
        this.timeSlotRepository = timeSlotRepository;
        this.userService = userService;
    }

    public void createTimeSlot(DayDto randomDay, TimeDto randomTime, String topic, StudyPlan studyPlan, User user) {
        TimeSlot timeSlot = new TimeSlot();

        timeSlot.setDay(randomDay.getDay());
        timeSlot.setTitle(topic);
        timeSlot.setStartTime(Integer.parseInt(randomTime.getStartTime().split(":")[0]));
        timeSlot.setEndTime(Integer.parseInt(randomTime.getEndTime().split(":")[0]));
        timeSlot.setStudyPlan(studyPlan);
        timeSlot.setUser(user);

        this.timeSlotRepository.save(timeSlot);
    }

    public List<TimeSlotDto> getTimeSlots() {
        User user = this.userService.getCurrentlyLoggedInUser();

        return this.timeSlotRepository.getTimeSlotsByUserId(user.getId());
    }

    public boolean checkIfDayIsTaken(Integer day, Long userId) {

        return this.timeSlotRepository.checkIfDayIsTaken(userId, day);
    }

    public TimeSlot getTimeSlotById(Long timeSlotId) {
        return this.timeSlotRepository.findById(timeSlotId).orElseThrow(
                () -> new NotFoundException(String.format("Time slot with id %d was not found", timeSlotId)));
    }

    public void updateTimeSlot(Long timeSlotId, Integer day) {
        User user = this.userService.getCurrentlyLoggedInUser();

        if (checkIfDayIsTaken(day, user.getId())) {
            throw new BadRequestException("Day on calendar has already been taken");
        }

        TimeSlot timeSlot = getTimeSlotById(timeSlotId);

        timeSlot.setDay(day);

        this.timeSlotRepository.save(timeSlot);
    }
}
