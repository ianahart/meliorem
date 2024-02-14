package com.hart.meliorem.group;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hart.meliorem.group.request.CreateGroupRequest;
import com.hart.meliorem.group.response.CreateGroupResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/api/v1/groups")
public class GroupController {

    private final GroupService groupService;

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @PostMapping("")
    public ResponseEntity<CreateGroupResponse> createGroup(@Valid @RequestBody CreateGroupRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new CreateGroupResponse("success", this.groupService.createGroup(request.getName())));
    }
}
