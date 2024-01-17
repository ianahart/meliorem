package com.hart.meliorem.studyset;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hart.meliorem.studyset.request.CreateStudySetRequest;
import com.hart.meliorem.studyset.response.CreateStudySetResponse;

@RestController
@RequestMapping(path = "/api/v1/studysets")
public class StudySetController {

  private final StudySetService studySetService;

  public StudySetController(StudySetService studySetService) {
    this.studySetService = studySetService;
  }

  @RequestMapping("")
  ResponseEntity<CreateStudySetResponse> createStudySet(@RequestBody CreateStudySetRequest request) {

    this.studySetService.createStudySet(request);

    return ResponseEntity.status(HttpStatus.OK).body(new CreateStudySetResponse("success"));
  }
}