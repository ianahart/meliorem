package com.hart.meliorem.group;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hart.meliorem.advice.NotFoundException;
import com.hart.meliorem.group.dto.CreateGroupDto;
import com.hart.meliorem.advice.BadRequestException;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;

@Service
public class GroupService {

    private final GroupRepository groupRepository;

    private final UserService userService;

    @Autowired
    public GroupService(
            GroupRepository groupRepository,
            UserService userService) {
        this.groupRepository = groupRepository;
        this.userService = userService;
    }

    public Group findGroupByGroupId(Long groupId) {

        return this.groupRepository
                .findById(groupId)
                .orElseThrow(() -> new NotFoundException(String.format("Could not find group with id %d", groupId)));
    }

    public boolean userAlreadyCreatedGroup(Long userId, String name) {

        return this.groupRepository.groupExistsByUserIdAndName(userId, name);
    }

    public CreateGroupDto createGroup(String name) {
        User user = this.userService.getCurrentlyLoggedInUser();

        if (userAlreadyCreatedGroup(user.getId(), name)) {
            throw new BadRequestException(String.format("You've already created a group with the name %s", name));
        }

        Group group = new Group(Jsoup.clean(name, Safelist.none()), user);

        this.groupRepository.save(group);
        return new CreateGroupDto(group.getName(), group.getId(), group.getAdmin().getId());
    }
}
