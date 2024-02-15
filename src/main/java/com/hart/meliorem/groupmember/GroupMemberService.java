package com.hart.meliorem.groupmember;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hart.meliorem.group.Group;
import com.hart.meliorem.group.GroupService;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;

@Service
public class GroupMemberService {

    private final GroupMemberRepository groupMemberRepository;

    private final GroupService groupService;

    private final UserService userService;

    @Autowired
    public GroupMemberService(
            GroupService groupService,
            UserService userService,
            GroupMemberRepository groupMemberRepository) {
        this.groupService = groupService;
        this.userService = userService;
        this.groupMemberRepository = groupMemberRepository;
    }

    public void createGroupMember(Long inviterId, Long groupId, Long memberId, Boolean accepted) {
        User inviter = this.userService.getUserById(inviterId);
        User member = this.userService.getUserById(memberId);
        Group group = this.groupService.findGroupByGroupId(groupId);

        GroupMember groupMember = new GroupMember(group, member, inviter, accepted, true);

        this.groupMemberRepository.save(groupMember);
    }

    public List<Long> getGroupMemberIdsFromGroup(Long groupId) {
        return this.groupMemberRepository.getGroupMembersByGroupId(groupId);

    }
}
