package com.hart.meliorem.studyplan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.hart.meliorem.advice.BadRequestException;

import com.hart.meliorem.studyplan.dto.DayDto;
import com.hart.meliorem.studyplan.dto.TimeDto;
import com.hart.meliorem.studyplan.request.CreateStudyPlanRequest;
import com.hart.meliorem.timeslot.TimeSlotService;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;
import java.util.List;
import java.util.Random;

@Service
public class StudyPlanService {

    private final StudyPlanRepository studyPlanRepository;

    private final UserService userService;

    private final TimeSlotService timeSlotService;

    @Autowired
    public StudyPlanService(StudyPlanRepository studyPlanRepository,
            UserService userService,
            @Lazy TimeSlotService timeSlotService) {
        this.studyPlanRepository = studyPlanRepository;
        this.userService = userService;
        this.timeSlotService = timeSlotService;
    }

    private <T> T generateRandomIndex(List<T> list) {
        int rnd = new Random().nextInt(list.size());
        return list.get(rnd);
    }

    public void createStudyPlan(CreateStudyPlanRequest request) {

        User user = this.userService.getCurrentlyLoggedInUser();

        if (user.getStudyPlans().size() > 0) {
            throw new BadRequestException("You have already created a study plan");
        }

        StudyPlan studyPlan = new StudyPlan(user);

        this.studyPlanRepository.save(studyPlan);

        for (String topic : request.getTopics()) {
            DayDto randomDay = generateRandomIndex(request.getDays());
            TimeDto randomTime = generateRandomIndex(request.getTimes());
            while (this.timeSlotService.checkIfDayIsTaken(randomDay.getDay(), user.getId())) {
                randomDay = generateRandomIndex(request.getDays());
            }
            this.timeSlotService.createTimeSlot(randomDay, randomTime, topic, studyPlan, user);
        }

    }
}
