package com.hart.meliorem.recommendation;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hart.meliorem.studyset.StudySet;
import com.hart.meliorem.studyset.StudySetService;
import com.hart.meliorem.studyset.dto.StudySetMinDto;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;

import jakarta.validation.ConstraintViolationException;

import com.hart.meliorem.advice.NotFoundException;
import com.hart.meliorem.pagination.PaginationService;
import com.hart.meliorem.pagination.dto.PaginationDto;
import com.hart.meliorem.recommendation.dto.RecommendationDto;
import com.hart.meliorem.recommendation.dto.UniqueUserStudySetItemsDto;

@Service
public class RecommendationService {

    private final PaginationService paginationService;

    private final RecommendationRepository recommendationRepository;

    private final UserService userService;

    private final StudySetService studySetService;

    @Autowired
    public RecommendationService(
            PaginationService paginationService,
            RecommendationRepository recommendationRepository,
            UserService userService,
            StudySetService studySetService) {
        this.paginationService = paginationService;
        this.recommendationRepository = recommendationRepository;
        this.userService = userService;
        this.studySetService = studySetService;
    }

    private Recommendation getRecommendationById(Long recommendationId) {
        return this.recommendationRepository
                .findById(recommendationId)
                .orElseThrow(() -> new NotFoundException(
                        String.format("Recommendation with the id %d was not found", recommendationId)));
    }

    private UniqueUserStudySetItemsDto getUniqueUserStudySets(List<StudySetMinDto> userStudySets) {
        List<String> uniqueUserCourses = new ArrayList<>();
        List<String> uniqueUserSchoolNames = new ArrayList<>();

        for (StudySetMinDto userStudySet : userStudySets) {
            String userCourse = userStudySet.getCourse().toLowerCase();
            String userSchoolName = userStudySet.getSchoolName().toLowerCase();

            if (!uniqueUserCourses.contains(userCourse)) {
                uniqueUserCourses.add(userCourse);
            }

            if (!uniqueUserSchoolNames.contains(userSchoolName)) {
                uniqueUserSchoolNames.add(userSchoolName);
            }
        }

        return new UniqueUserStudySetItemsDto(uniqueUserCourses, uniqueUserSchoolNames);
    }

    private boolean checkRecommendationExists(Long userId, Long studySetId) {
        return this.recommendationRepository.checkRecommendationExists(userId, studySetId);
    }

    private Recommendation getMostRecentRecommendation(Long userId) {
        Recommendation lastRecommendation = recommendationRepository.findFirstByUserIdOrderByCreatedAtDesc(userId);
        return lastRecommendation;
    }

    private void saveRecommendation(StudySetMinDto matchingStudySet, User user) {

        StudySet studySet = this.studySetService.findStudySetById(matchingStudySet.getId());

        if (!checkRecommendationExists(user.getId(), studySet.getId())) {
            Timestamp lastGeneratedAt = new Timestamp(System.currentTimeMillis());
            this.recommendationRepository.save(new Recommendation(user, studySet, lastGeneratedAt));
        }
    }

    private boolean isMostRecentAWeekOld(Timestamp lastGeneratedAt) {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        long oneWeekInMillis = 7 * 24 * 60 * 60 * 1000;

        return lastGeneratedAt != null && now.getTime() - lastGeneratedAt.getTime() > oneWeekInMillis;
    }

    private boolean canGenerateRecommendations(Long userId) {

        Recommendation mostRecentRecommendation = getMostRecentRecommendation(userId);

        if (mostRecentRecommendation == null) {
            return false;
        }

        return isMostRecentAWeekOld(mostRecentRecommendation.getLastGeneratedAt());

    }

    private void updateMostRecentRecommendation(Long userId) {
        Recommendation mostRecentRecommendation = getMostRecentRecommendation(userId);

        Timestamp lastGeneratedAt = new Timestamp(System.currentTimeMillis());

        mostRecentRecommendation.setLastGeneratedAt(lastGeneratedAt);

        this.recommendationRepository.save(mostRecentRecommendation);
    }

    public void generateRecommendations() {
        try {
            User user = userService.getCurrentlyLoggedInUser();

            if (!canGenerateRecommendations(user.getId())) {
                return;
            }

            UniqueUserStudySetItemsDto uniqueUserStudySets = getUniqueUserStudySets(
                    this.studySetService.byUserId(user.getId()));

            List<StudySetMinDto> matchingStudySets = this.studySetService.getMatchingStudySetsBySchoolAndCourses(
                    user.getId(), uniqueUserStudySets.getUniqueUserCourses(),
                    uniqueUserStudySets.getUniqueUserSchoolNames());

            for (StudySetMinDto matchingStudySet : matchingStudySets) {
                saveRecommendation(matchingStudySet, user);
            }

            updateMostRecentRecommendation(user.getId());

        } catch (ConstraintViolationException e) {
            System.err.println("Error generating recommendations: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public PaginationDto<RecommendationDto> getRecommendations(int page, int pageSize,
            String direction) {

        User user = this.userService.getCurrentlyLoggedInUser();

        Pageable pageable = this.paginationService.getPageable(page, pageSize, direction);
        Page<RecommendationDto> result = this.recommendationRepository.getRecommendationsByUserId(user.getId(),
                pageable);

        return new PaginationDto<RecommendationDto>(
                result.getContent(),
                result.getNumber(),
                pageSize,
                result.getTotalPages(),
                direction,
                result.getTotalElements());

    }

}
