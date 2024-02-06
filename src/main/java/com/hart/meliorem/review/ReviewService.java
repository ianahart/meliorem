package com.hart.meliorem.review;

import java.util.Optional;

import com.hart.meliorem.advice.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hart.meliorem.review.dto.ReviewStatsDto;
import com.hart.meliorem.review.request.CreateReviewRequest;
import com.hart.meliorem.studyset.StudySet;
import com.hart.meliorem.studyset.StudySetService;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    private final UserService userService;

    private final StudySetService studySetService;

    @Autowired
    public ReviewService(
            ReviewRepository reviewRepository,
            UserService userService,
            StudySetService studySetService) {
        this.reviewRepository = reviewRepository;
        this.userService = userService;
        this.studySetService = studySetService;
    }

    private boolean CheckAlreadyReviewed(User user, Long studySetId) {
        boolean alreadyReviewed = false;

        Optional<Review> existingReview = user.getReviews().stream()
                .filter(rev -> rev.getStudySet().getId() == studySetId).findFirst();

        if (existingReview.isPresent()) {
            alreadyReviewed = true;
        }

        return alreadyReviewed;
    }

    public void createReview(CreateReviewRequest request) {
        User user = this.userService.getUserById(request.getUserId());
        if (CheckAlreadyReviewed(user, request.getStudySetId())) {
            throw new BadRequestException("You have already reviewed this studyset");
        }

        StudySet studySet = this.studySetService.findStudySetById(request.getStudySetId());

        Review review = new Review(request.getRating(), request.getFeedback(), user, studySet);

        this.reviewRepository.save(review);
    }

    private Float calculateAvgRating(Long studySetId) {
        return this.reviewRepository.getAvgRatingByStudySetId(studySetId);
    }

    private Long calculateTotalReviews(Long studySetId) {
        return this.reviewRepository.getTotalReviewsCount(studySetId);
    }

    public ReviewStatsDto getReviewStats(Long studySetId) {
        User curUser = this.userService.getCurrentlyLoggedInUser();

        Float avgRating = calculateAvgRating(studySetId);
        Long totalReviews = calculateTotalReviews(studySetId);
        Boolean curUserReviewed = CheckAlreadyReviewed(curUser, studySetId);

        return new ReviewStatsDto(avgRating, totalReviews, curUserReviewed);

    }
}
