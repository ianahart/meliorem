package com.hart.meliorem.groupstudyset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hart.meliorem.advice.NotFoundException;
import com.hart.meliorem.advice.ForbiddenException;
import com.hart.meliorem.advice.BadRequestException;
import com.hart.meliorem.group.Group;
import com.hart.meliorem.group.GroupService;
import com.hart.meliorem.groupstudyset.dto.GroupStudySetDto;
import com.hart.meliorem.pagination.PaginationService;
import com.hart.meliorem.pagination.dto.PaginationDto;
import com.hart.meliorem.studyset.StudySet;
import com.hart.meliorem.studyset.StudySetService;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;

@Service
public class GroupStudySetService {

    private final GroupStudySetRepository groupStudySetRepository;

    private final PaginationService paginationService;

    private final UserService userService;

    private final GroupService groupService;

    private final StudySetService studySetService;

    @Autowired
    public GroupStudySetService(
            GroupStudySetRepository groupStudySetRepository,
            PaginationService paginationService,
            UserService userService,
            GroupService groupService,
            StudySetService studySetService) {
        this.groupStudySetRepository = groupStudySetRepository;
        this.paginationService = paginationService;
        this.userService = userService;
        this.groupService = groupService;
        this.studySetService = studySetService;
    }

    public GroupStudySet getGroupStudyStudySetById(Long groupStudySetId) {
        return this.groupStudySetRepository.findById(groupStudySetId).orElseThrow(() -> new NotFoundException(
                String.format("A group study set with the id %d was not found", groupStudySetId)));
    }

    private boolean studySetExistsInGroup(Long studySetId, Long groupId) {

        return this.groupStudySetRepository.getGroupStudySetByGroupIdAndStudySetId(studySetId, groupId);
    }

    public void createGroupStudySet(Long studySetId, Long groupId) {
        Group group = this.groupService.findGroupByGroupId(groupId);
        StudySet studySet = this.studySetService.findStudySetById(studySetId);
        User user = this.userService.getCurrentlyLoggedInUser();

        if (studySetExistsInGroup(studySetId, groupId)) {
            throw new BadRequestException("You've already added this study set to the group");
        }

        if (group.getAdmin().getId() != user.getId()) {
            throw new ForbiddenException("You have to be an admin of this group to add a study set");
        }

        this.groupStudySetRepository.save(new GroupStudySet(user, studySet, group));
    }

    public PaginationDto<GroupStudySetDto> getGroupStudySets(Long groupId, int page, int pageSize, String direction) {

        Pageable pageable = this.paginationService.getPageable(page, pageSize, direction);

        Page<GroupStudySetDto> result = this.groupStudySetRepository.getGroupStudySetsByGroupId(groupId, pageable);

        return new PaginationDto<GroupStudySetDto>(
                result.getContent(),
                result.getNumber(),
                pageSize,
                result.getTotalPages(),
                direction,
                result.getTotalElements());

    }

    public void deleteGroupStudySet(Long groupStudySetId) {
        User user = this.userService.getCurrentlyLoggedInUser();
        GroupStudySet groupStudySet = getGroupStudyStudySetById(groupStudySetId);

        if (user.getId() != groupStudySet.getUser().getId()) {
            throw new ForbiddenException("Only admin can delete study sets from a group");
        }

        this.groupStudySetRepository.delete(groupStudySet);

    }
}
