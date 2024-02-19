package com.hart.meliorem.groupmessage;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hart.meliorem.groupmessage.response.GetGroupMessagesResponse;

@RestController
@RequestMapping(path = "/api/v1/group-messages")
public class GroupMessageController {

    private final GroupMessageService groupMessageService;

    public GroupMessageController(GroupMessageService groupMessageService) {
        this.groupMessageService = groupMessageService;
    }

    @GetMapping("")
    ResponseEntity<GetGroupMessagesResponse> getGroupMessages(@RequestParam("groupId") Long groupId) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GetGroupMessagesResponse("success", this.groupMessageService.getGroupMessages(groupId)));
    }
}
