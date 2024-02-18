package com.hart.meliorem.groupmember;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hart.meliorem.advice.NotFoundException;
import com.hart.meliorem.advice.ForbiddenException;

import com.hart.meliorem.group.Group;
import com.hart.meliorem.group.GroupService;
import com.hart.meliorem.group.dto.GroupDto;
import com.hart.meliorem.groupmember.dto.GroupMemberDto;
import com.hart.meliorem.groupmember.dto.GroupMemberInviteDto;
import com.hart.meliorem.pagination.PaginationService;
import com.hart.meliorem.pagination.dto.PaginationDto;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;

@Service
public class GroupMemberService {

    private final GroupMemberRepository groupMemberRepository;

    private final GroupService groupService;

    private final UserService userService;

    private final PaginationService paginationService;

    @Autowired
    public GroupMemberService(
            GroupService groupService,
            UserService userService,
            GroupMemberRepository groupMemberRepository,
            PaginationService paginationService) {
        this.groupService = groupService;
        this.userService = userService;
        this.groupMemberRepository = groupMemberRepository;
        this.paginationService = paginationService;
    }

    public PaginationDto<GroupMemberInviteDto> getGroupMemberInvites(int isAccepted, Long userId, int page,
            int pageSize, String direction) {

        Pageable pageable = this.paginationService.getPageable(page, pageSize, direction);
        Boolean isMemberAccepted = isAccepted == 1 ? true : false;
        Page<GroupMemberInviteDto> result = this.groupMemberRepository.getGroupInvitesByUserId(isMemberAccepted, userId,
                pageable);

        return new PaginationDto<GroupMemberInviteDto>(
                result.getContent(),
                result.getNumber(),
                pageSize,
                result.getTotalPages(),
                direction,
                result.getTotalElements());

    }

    public GroupMember findGroupMemberById(Long groupMemberId) {

        return this.groupMemberRepository
                .findById(groupMemberId)
                .orElseThrow(() -> new NotFoundException(
                        String.format("A group member with the id %d was not found", groupMemberId)));
    }

    public void createGroupMember(Long inviterId, Long groupId, Long memberId, Boolean accepted) {
        User inviter = this.userService.getUserById(inviterId);
        User member = this.userService.getUserById(memberId);
        Group group = this.groupService.findGroupByGroupId(groupId);

        GroupMember groupMember = new GroupMember(group, member, inviter, accepted, true);

        this.groupMemberRepository.save(groupMember);
    }

    public List<Long> getGroupMemberIdsFromGroup(Long groupId) {
        return this.groupMemberRepository.getGroupMembersIdByGroupId(groupId);

    }

    public Page<GroupDto> getGroupsForGroupMember(Long memberId, Pageable pageable) {
        return this.groupMemberRepository.getGroupsForGroupMember(memberId, pageable);
    }

    public GroupDto updateGroupMember(Long groupMemberId, Long groupId, Boolean accepted) {
        User user = this.userService.getCurrentlyLoggedInUser();
        GroupMember groupMember = findGroupMemberById(groupMemberId);

        if (user.getId() != groupMember.getMember().getId()) {
            throw new ForbiddenException("You cannot update another's person's groupmember settings");
        }

        groupMember.setAccepted(accepted);

        this.groupMemberRepository.save(groupMember);

        Group group = this.groupService.findGroupByGroupId(groupId);

        return new GroupDto(group.getName(), group.getId(), group.getAdmin().getId());
    }

    private Boolean checkCurUserIsGroupMember(Long groupId) {
        User user = this.userService.getCurrentlyLoggedInUser();
        Group group = this.groupService.findGroupByGroupId(groupId);

        Optional<GroupMember> curUser = group.getGroupMembers().stream()
                .filter(gm -> gm.getMember().getId() == user.getId())
                .findFirst();
        return curUser.isPresent();
    }

    public PaginationDto<GroupMemberDto> getGroupMembers(Long groupId, int accepted, int page, int pageSize,
            String direction) {

        Pageable pageable = this.paginationService.getPageable(page, pageSize, direction);
        Boolean isAccepted = accepted == 1 ? true : false;

        Page<GroupMemberDto> result = this.groupMemberRepository.getGroupMembersByGroupId(groupId, isAccepted,
                pageable);

        if (!checkCurUserIsGroupMember(groupId)) {
            throw new ForbiddenException("Cannot view a group you are not apart of");
        }
        return new PaginationDto<GroupMemberDto>(
                result.getContent(),
                result.getNumber(),
                pageSize,
                result.getTotalPages(),
                direction,
                result.getTotalElements());

    }


    public void deleteGroupMember(Long groupMemberId) {

       this.groupMemberRepository.deleteById(groupMemberId);
    }
}
