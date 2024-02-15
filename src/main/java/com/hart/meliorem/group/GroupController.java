package com.hart.meliorem.group;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hart.meliorem.group.request.CreateGroupRequest;
import com.hart.meliorem.group.response.CreateGroupResponse;
import com.hart.meliorem.group.response.GetGroupsResponse;

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

    @GetMapping("")
    public ResponseEntity<GetGroupsResponse> getGroups(@RequestParam("page") int page, @RequestParam("pageSize") int pageSize, @RequestParam("direction") String direction, @RequestParam("userId") Long userId) {

        return ResponseEntity
        .status(HttpStatus.OK)
        .body(new GetGroupsResponse("success", this.groupService.getGroups(page, pageSize, direction, userId)));
    }

}
