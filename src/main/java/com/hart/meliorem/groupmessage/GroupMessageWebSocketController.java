package com.hart.meliorem.groupmessage;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.hart.meliorem.group.GroupService;
import com.hart.meliorem.groupmember.GroupMemberService;
import com.hart.meliorem.groupmessage.dto.GroupMessageDto;
import com.hart.meliorem.groupmessage.request.CreateGroupMessageRequest;

@Controller
public class GroupMessageWebSocketController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final GroupMessageService groupMessageService;
    private final GroupMemberService groupMemberService;
    private final GroupService groupService;

    @Autowired
    public GroupMessageWebSocketController(
            SimpMessagingTemplate simpMessagingTemplate,
            GroupMessageService groupMessageService,
            GroupMemberService groupMemberService,
            GroupService groupService) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.groupMessageService = groupMessageService;
        this.groupMemberService = groupMemberService;
        this.groupService = groupService;
    }

    @MessageMapping("chat-group")
    public void receiveFriendRequest(@Payload CreateGroupMessageRequest request) {
        Long id = this.groupMessageService.createGroupMessage(request);
        GroupMessageDto groupMessage = this.groupMessageService.getGroupMessage(id);
        List<Long> groupMemberUserIds = this.groupMemberService.getGroupMemberIdsFromGroup(request.getGroupId());

        for (Long groupMemberUserId : groupMemberUserIds) {
            this.simpMessagingTemplate.convertAndSendToUser(
                    String.valueOf(groupMemberUserId),
                    "group",
                    groupMessage);

        }


    }

}
