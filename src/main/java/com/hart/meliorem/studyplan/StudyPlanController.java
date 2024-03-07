package com.hart.meliorem.studyplan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hart.meliorem.studyplan.request.CreateStudyPlanRequest;
import com.hart.meliorem.studyplan.response.CreateStudyPlanResponse;

@RestController
@RequestMapping(path = "/api/v1/study-plans")
public class StudyPlanController {

    private final StudyPlanService studyPlanService;

    @Autowired
    public StudyPlanController(StudyPlanService studyPlanService) {
        this.studyPlanService = studyPlanService;
    }


    @PostMapping("")
    ResponseEntity<CreateStudyPlanResponse> createStudyPlan(@RequestBody CreateStudyPlanRequest request) {
        this.studyPlanService.createStudyPlan(request);
        return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(new CreateStudyPlanResponse("success"));
    }
}
