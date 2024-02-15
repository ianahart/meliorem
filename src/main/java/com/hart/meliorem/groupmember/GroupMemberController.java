package com.hart.meliorem.groupmember;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hart.meliorem.groupmember.request.CreateGroupMemberRequest;
import com.hart.meliorem.groupmember.response.CreateGroupMemberResponse;

@RestController
@RequestMapping(path = "/api/v1/group-members")
public class GroupMemberController {

    private final GroupMemberService groupMemberService;

    public GroupMemberController(GroupMemberService groupMemberService) {
        this.groupMemberService = groupMemberService;
    }

    @PostMapping("")
    public ResponseEntity<CreateGroupMemberResponse> createGroupMember(@RequestBody CreateGroupMemberRequest request) {

        this.groupMemberService.createGroupMember(request.getInviterId(), request.getGroupId(), request.getMemberId(),
                false);
        return ResponseEntity.status(HttpStatus.CREATED).body(new CreateGroupMemberResponse("success"));
    }
}
