package com.hart.meliorem.studyset;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hart.meliorem.studyset.request.CreateStudySetRequest;
import com.hart.meliorem.studyset.response.CreateStudySetResponse;
import com.hart.meliorem.studyset.response.GetAllStudySetResponse;
import com.hart.meliorem.studyset.response.GetStudySetFolderResponse;
import com.hart.meliorem.studyset.response.GetStudySetResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/api/v1/studysets")
public class StudySetController {

    private final StudySetService studySetService;

    public StudySetController(StudySetService studySetService) {
        this.studySetService = studySetService;
    }

    @PostMapping("")
    ResponseEntity<CreateStudySetResponse> createStudySet(@Valid @RequestBody CreateStudySetRequest request) {

        this.studySetService.createStudySet(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(new CreateStudySetResponse("success"));
    }

    @GetMapping("/folders")
    ResponseEntity<GetStudySetFolderResponse> getStudySetFolders(@RequestParam("query") String query,
            @RequestParam("limit") int limit, @RequestParam("page") int page,
            @RequestParam("direction") String direction) {

        return ResponseEntity.status(HttpStatus.OK).body(new GetStudySetFolderResponse("success",
                this.studySetService.getStudySetFolders(query, limit, page, direction)));
    }

    @GetMapping("")
    ResponseEntity<GetAllStudySetResponse> getStudySets(
            @RequestParam("userId") Long userId,
            @RequestParam("page") int page,
            @RequestParam("pageSize") int pageSize,
            @RequestParam("direction") String direction) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GetAllStudySetResponse("success",
                        this.studySetService.getStudySets(userId, page, pageSize, direction)));
    }

    @GetMapping("/{studySetId}")
    ResponseEntity<GetStudySetResponse> getStudySet(@PathVariable("studySetId") Long studySetId) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GetStudySetResponse("success", this.studySetService.getStudySet(studySetId)));
    }
}
