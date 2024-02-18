package com.hart.meliorem.groupstudyset;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hart.meliorem.groupstudyset.request.CreateGroupStudySetRequest;
import com.hart.meliorem.groupstudyset.response.CreateGroupStudySetResponse;
import com.hart.meliorem.groupstudyset.response.DeleteGroupStudySetResponse;
import com.hart.meliorem.groupstudyset.response.GetGroupStudySetsResponse;

@RestController
@RequestMapping(path = "/api/v1/group-studysets")
public class GroupStudySetController {

    private final GroupStudySetService groupStudySetService;

    public GroupStudySetController(GroupStudySetService groupStudySetService) {
        this.groupStudySetService = groupStudySetService;
    }

    @PostMapping("")
    ResponseEntity<CreateGroupStudySetResponse> createGroupStudySet(@RequestBody CreateGroupStudySetRequest request) {

        this.groupStudySetService.createGroupStudySet(request.getStudySetId(), request.getGroupId());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new CreateGroupStudySetResponse("success"));
    }

    @GetMapping("")
    ResponseEntity<GetGroupStudySetsResponse> getGroupStudySets(@RequestParam("groupId") Long groupId,
            @RequestParam("page") int page, @RequestParam("pageSize") int pageSize,
            @RequestParam("direction") String direction) {

        return ResponseEntity.status(HttpStatus.OK).body(new GetGroupStudySetsResponse("success",
                this.groupStudySetService.getGroupStudySets(groupId, page, pageSize, direction)));
    }

    @DeleteMapping("/{groupStudySetId}")
    ResponseEntity<DeleteGroupStudySetResponse> deleteGroupStudySet(@PathVariable("groupStudySetId") Long groupStudySetId) {

        this.groupStudySetService.deleteGroupStudySet(groupStudySetId);

        return ResponseEntity.status(HttpStatus.OK).body(new DeleteGroupStudySetResponse("success"));
    }
}
