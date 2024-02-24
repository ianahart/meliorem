package com.hart.meliorem.streak.dto;

public class StreakStatDto {

    private Long setsStudied;

    private Integer weeklyStreak;

    public StreakStatDto() {

    }

    public StreakStatDto(Long setsStudied, Integer weeklyStreak) {
        this.setsStudied = setsStudied;
        this.weeklyStreak = weeklyStreak;
    }

    public Long getSetsStudied() {
        return setsStudied;
    }

    public Integer getWeeklyStreak() {
        return weeklyStreak;
    }

    public void setSetsStudied(Long setsStudied) {
        this.setsStudied = setsStudied;
    }

    public void setWeeklyStreak(Integer weeklyStreak) {
        this.weeklyStreak = weeklyStreak;
    }

}
