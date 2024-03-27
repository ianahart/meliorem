package com.hart.meliorem.recommendation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hart.meliorem.recommendation.response.CreateRecommendationResponse;
import com.hart.meliorem.recommendation.response.GetRecommendationResponse;

@RestController
@RequestMapping(path = "/api/v1/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    @Autowired
    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping("")
    public ResponseEntity<GetRecommendationResponse> getRecommendations(@RequestParam("page") int page,
            @RequestParam("pageSize") int pageSize, @RequestParam("direction") String direction) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GetRecommendationResponse("success",
                        this.recommendationService.getRecommendations(page, pageSize, direction)));
    }

    @PostMapping("")
    public ResponseEntity<CreateRecommendationResponse> createRecommendations() {
        this.recommendationService.generateRecommendations();
        return ResponseEntity.status(HttpStatus.CREATED).body(new CreateRecommendationResponse("success"));
    }
}
