package com.hart.meliorem.group;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.hart.meliorem.advice.NotFoundException;
import com.hart.meliorem.group.dto.GroupDto;
import com.hart.meliorem.group.request.UpdateGroupRequest;
import com.hart.meliorem.groupmember.GroupMemberService;
import com.hart.meliorem.pagination.PaginationService;
import com.hart.meliorem.pagination.dto.PaginationDto;
import com.hart.meliorem.advice.BadRequestException;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;

@Service
public class GroupService {

    private final GroupRepository groupRepository;

    private final UserService userService;

    private final GroupMemberService groupMemberService;

    private final PaginationService paginationService;

    @Autowired
    public GroupService(
            GroupRepository groupRepository,
            UserService userService,
            @Lazy GroupMemberService groupMemberService,
            PaginationService paginationService) {
        this.groupRepository = groupRepository;
        this.userService = userService;
        this.groupMemberService = groupMemberService;
        this.paginationService = paginationService;
    }

    public Group findGroupByGroupId(Long groupId) {

        return this.groupRepository
                .findById(groupId)
                .orElseThrow(() -> new NotFoundException(String.format("Could not find group with id %d", groupId)));
    }

    public boolean userAlreadyCreatedGroup(Long userId, String name) {

        return this.groupRepository.groupExistsByUserIdAndName(userId, name);
    }

    public GroupDto createGroup(String name) {
        User user = this.userService.getCurrentlyLoggedInUser();

        if (userAlreadyCreatedGroup(user.getId(), name)) {
            throw new BadRequestException(String.format("You've already created a group with the name %s", name));
        }

        Group group = new Group(Jsoup.clean(name, Safelist.none()), user);

        this.groupRepository.save(group);

        this.groupMemberService.createGroupMember(user.getId(), group.getId(), user.getId(), true);

        return new GroupDto(group.getName(), group.getId(), group.getAdmin().getId());
    }

    public PaginationDto<GroupDto> getGroups(int page, int pageSize, String direction, Long userId) {

        Pageable pageable = this.paginationService.getPageable(page, pageSize, direction);

        Page<GroupDto> result = this.groupMemberService.getGroupsForGroupMember(userId, pageable);

        return new PaginationDto<GroupDto>(
                result.getContent(),
                result.getNumber(),
                pageSize,
                result.getTotalPages(),
                direction,
                result.getTotalElements());

    }

    public void updateGroup(Long groupId, UpdateGroupRequest request) {
        Group group = findGroupByGroupId(groupId);
        User newAdmin = this.userService.getUserById(request.getNewAdminId());

        this.groupMemberService.deleteGroupMemberFromGroup(request.getOldAdminId(), groupId);
        this.groupMemberService.updateGroupMemberInviter(newAdmin, request.getOldAdminId(), groupId);

        group.setAdmin(newAdmin);

        this.groupRepository.save(group);

    }

    public void deleteGroup(Long groupId) {
        this.groupRepository.deleteById(groupId);
    }
}
