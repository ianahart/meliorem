package com.hart.meliorem.recommendation.dto;

import java.util.List;

public class UniqueUserStudySetItemsDto {

    private List<String> uniqueUserCourses;

    private List<String> uniqueUserSchoolNames;

    public UniqueUserStudySetItemsDto() {

    }

    public UniqueUserStudySetItemsDto(List<String> uniqueUserCourses, List<String> uniqueUserSchoolNames) {
        this.uniqueUserCourses = uniqueUserCourses;
        this.uniqueUserSchoolNames = uniqueUserSchoolNames;
    }

    public List<String> getUniqueUserCourses() {
        return uniqueUserCourses;
    }

    public List<String> getUniqueUserSchoolNames() {
        return uniqueUserSchoolNames;
    }

    public void setUniqueUserCourses(List<String> uniqueUserCourses) {
        this.uniqueUserCourses = uniqueUserCourses;
    }

    public void setUniqueUserSchoolNames(List<String> uniqueUserSchoolNames) {
        this.uniqueUserSchoolNames = uniqueUserSchoolNames;
    }

}
