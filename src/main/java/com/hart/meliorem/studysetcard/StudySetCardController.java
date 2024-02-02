package com.hart.meliorem.studysetcard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hart.meliorem.studysetcard.response.DeleteStudySetCardResponse;

@RestController
@RequestMapping(path = "/api/v1/studyset-cards")
public class StudySetCardController {

    private final StudySetCardService studySetCardService;

    @Autowired
    public StudySetCardController(StudySetCardService studySetCardService) {
        this.studySetCardService = studySetCardService;
    }

    @DeleteMapping("/{studySetCardId}")
    ResponseEntity<DeleteStudySetCardResponse> deleteStudySetCard(
            @PathVariable("studySetCardId") String studySetCardId) {

        this.studySetCardService.deleteStudySetCard(studySetCardId);
        return ResponseEntity.status(HttpStatus.OK).body(new DeleteStudySetCardResponse("success"));

    }

}
