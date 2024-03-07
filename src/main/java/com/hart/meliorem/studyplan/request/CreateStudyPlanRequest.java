package com.hart.meliorem.studyplan.request;

import java.util.List;

import com.hart.meliorem.studyplan.dto.DayDto;
import com.hart.meliorem.studyplan.dto.TimeDto;

public class CreateStudyPlanRequest {

    private List<String> topics;

    private List<DayDto> days;

    private List<TimeDto> times;

    public CreateStudyPlanRequest() {

    }

    public CreateStudyPlanRequest(List<String> topics, List<DayDto> days, List<TimeDto> times) {
        this.topics = topics;
        this.days = days;
        this.times = times;
    }

    public List<DayDto> getDays() {
        return days;
    }

    public List<TimeDto> getTimes() {
        return times;
    }

    public List<String> getTopics() {
        return topics;
    }

    public void setDays(List<DayDto> days) {
        this.days = days;
    }

    public void setTimes(List<TimeDto> times) {
        this.times = times;
    }

    public void setTopics(List<String> topics) {
        this.topics = topics;
    }
}
