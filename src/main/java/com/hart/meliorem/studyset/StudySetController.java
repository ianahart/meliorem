package com.hart.meliorem.studyset;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hart.meliorem.studyset.request.CreateStudySetRequest;
import com.hart.meliorem.studyset.request.EditStudySetRequest;
import com.hart.meliorem.studyset.response.CreateStudySetResponse;
import com.hart.meliorem.studyset.response.DeleteStudySetResponse;
import com.hart.meliorem.studyset.response.EditStudySetResponse;
import com.hart.meliorem.studyset.response.GetAllStudySetResponse;
import com.hart.meliorem.studyset.response.GetStudySetDistinctFolderResponse;
import com.hart.meliorem.studyset.response.GetStudySetFolderResponse;
import com.hart.meliorem.studyset.response.GetStudySetPopulateResponse;
import com.hart.meliorem.studyset.response.GetStudySetResponse;
import com.hart.meliorem.studyset.response.SearchStudySetResponse;

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

    @GetMapping("/folder-names")
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
            @RequestParam("direction") String direction,
            @RequestParam(value = "folder", required = false) String folder) {

        if (folder.trim().length() == 0) {
            folder = null;
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GetAllStudySetResponse("success",
                        this.studySetService.getStudySets(userId, page, pageSize, direction, folder)));
    }

    @GetMapping("/{studySetId}")
    ResponseEntity<GetStudySetResponse> getStudySet(@PathVariable("studySetId") Long studySetId) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GetStudySetResponse("success", this.studySetService.getStudySet(studySetId)));
    }

    @GetMapping("/{studySetId}/populate")
    ResponseEntity<GetStudySetPopulateResponse> populateStudySet(@PathVariable("studySetId") Long studySetId) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GetStudySetPopulateResponse("success", this.studySetService.populateStudySet(studySetId)));
    }

    @PatchMapping("/{studySetId}")
    ResponseEntity<EditStudySetResponse> editStudySet(@PathVariable("studySetId") Long studySetId,
            @Valid @RequestBody EditStudySetRequest request) {

        this.studySetService.editStudySet(studySetId, request);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new EditStudySetResponse("success"));
    }

    @DeleteMapping("/{studySetId}")
    ResponseEntity<DeleteStudySetResponse> deleteStudySet(@PathVariable("studySetId") Long studySetId) {
        this.studySetService.deleteStudySet(studySetId);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new DeleteStudySetResponse("success"));
    }

    @GetMapping("/folders")
    ResponseEntity<GetStudySetDistinctFolderResponse> getDistinctFolders(@RequestParam("page") int page,
            @RequestParam("pageSize") int pageSize, @RequestParam("direction") String direction) {

        return ResponseEntity.status(HttpStatus.OK).body(new GetStudySetDistinctFolderResponse("success",
                this.studySetService.getDistinctFolders(page, pageSize, direction)));
    }

    @GetMapping("/search")
    ResponseEntity<SearchStudySetResponse> searchStudySets(@RequestParam("query") String query,
            @RequestParam("groupId") Long groupId, @RequestParam("page") int page,
            @RequestParam("pageSize") int pageSize, @RequestParam("direction") String direction) {

        return ResponseEntity.status(HttpStatus.OK).body(new SearchStudySetResponse("success",
                this.studySetService.searchStudySets(query, groupId, page, pageSize, direction)));
    }
}
