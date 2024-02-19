package com.hart.meliorem.groupmessage;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hart.meliorem.group.Group;
import com.hart.meliorem.group.GroupService;
import com.hart.meliorem.groupmessage.dto.GroupMessageDto;
import com.hart.meliorem.groupmessage.request.CreateGroupMessageRequest;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;

@Service
public class GroupMessageService {

    private final UserService userService;

    private final GroupService groupService;

    private final GroupMessageRepository groupMessageRepository;

    @Autowired
    public GroupMessageService(UserService userService,
            GroupService groupService,
            GroupMessageRepository groupMessageRepository) {
        this.userService = userService;
        this.groupService = groupService;
        this.groupMessageRepository = groupMessageRepository;
    }

    public GroupMessageDto getGroupMessage(Long groupMessageId) {
        return this.groupMessageRepository.getGroupMessage(groupMessageId);
    }

    public List<GroupMessageDto> getGroupMessages(Long groupId) {
        return this.groupMessageRepository.getGroupMessages(groupId);
    }

    public Long createGroupMessage(CreateGroupMessageRequest request) {
        User user = this.userService.getUserById(request.getUserId());
        Group group = this.groupService.findGroupByGroupId(request.getGroupId());

        GroupMessage groupMessage = new GroupMessage(user, group, request.getMessage());

        this.groupMessageRepository.save(groupMessage);

        return groupMessage.getId();
    }
}
