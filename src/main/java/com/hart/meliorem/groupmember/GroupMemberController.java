package com.hart.meliorem.groupmember;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hart.meliorem.groupmember.request.CreateGroupMemberRequest;
import com.hart.meliorem.groupmember.request.UpdateGroupMemberRequest;
import com.hart.meliorem.groupmember.response.CreateGroupMemberResponse;
import com.hart.meliorem.groupmember.response.GetGroupMembersResponse;
import com.hart.meliorem.groupmember.response.GetInviteResponse;
import com.hart.meliorem.groupmember.response.UpdateGroupMemberResponse;

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

    @GetMapping("/invites")
    ResponseEntity<GetInviteResponse> getGroupMemberInvites(
            @RequestParam("isAccepted") int isAccepted, @RequestParam("userId") Long userId,
            @RequestParam("page") int page, @RequestParam("pageSize") int pageSize,
            @RequestParam("direction") String direction) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GetInviteResponse("success",
                        this.groupMemberService.getGroupMemberInvites(isAccepted, userId, page, pageSize, direction)));
    }

    @PatchMapping("/{groupMemberId}")
    ResponseEntity<UpdateGroupMemberResponse> updateGroupMember(@PathVariable("groupMemberId") Long groupMemberId,

            @RequestBody UpdateGroupMemberRequest request) {
        return ResponseEntity.status(HttpStatus.OK).body(new UpdateGroupMemberResponse("success",
                this.groupMemberService.updateGroupMember(groupMemberId, request.getGroupId(), request.getAccepted())));
    }

    @GetMapping("")
    ResponseEntity<GetGroupMembersResponse> getGroupMembers(@RequestParam("groupId") Long groupId,
            @RequestParam("accepted") int accepted, @RequestParam("page") int page,
            @RequestParam("pageSize") int pageSize, @RequestParam("direction") String direction) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GetGroupMembersResponse("success",
                        this.groupMemberService.getGroupMembers(groupId, accepted, page, pageSize, direction)));
    }
}
