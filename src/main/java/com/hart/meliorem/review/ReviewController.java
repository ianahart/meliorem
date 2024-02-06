package com.hart.meliorem.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hart.meliorem.review.request.CreateReviewRequest;
import com.hart.meliorem.review.response.CreateReviewResponse;
import com.hart.meliorem.review.response.GetReviewStatsResponse;

import jakarta.validation.constraints.NotNull;

@RestController
@RequestMapping(path = "/api/v1/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("")
    ResponseEntity<CreateReviewResponse> createReview(@RequestBody CreateReviewRequest request) {
        this.reviewService.createReview(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new CreateReviewResponse("success"));
    }

    @GetMapping("/stats")
    ResponseEntity<GetReviewStatsResponse> getReviewStats(@NotNull @RequestParam("studySetId") Long studySetId) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(new GetReviewStatsResponse("success", this.reviewService.getReviewStats(studySetId)));
    }

}
