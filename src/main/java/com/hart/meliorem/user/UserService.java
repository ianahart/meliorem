package com.hart.meliorem.user;

import java.security.Key;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

import com.hart.meliorem.advice.NotFoundException;
import com.hart.meliorem.groupmember.GroupMemberService;
import com.hart.meliorem.pagination.PaginationService;
import com.hart.meliorem.pagination.dto.PaginationDto;
import com.hart.meliorem.token.TokenService;
import com.hart.meliorem.topic.TopicService;
import com.hart.meliorem.topic.dto.TopicDto;
import com.hart.meliorem.advice.BadRequestException;
import com.hart.meliorem.advice.ForbiddenException;
import com.hart.meliorem.user.dto.InviteeDto;
import com.hart.meliorem.user.dto.SearchUserDto;
import com.hart.meliorem.user.dto.UserDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class UserService {

    @Value("${secretkey}")
    private String secretKey;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final GroupMemberService groupMemberService;
    private final PaginationService paginationService;
    private final TopicService topicService;

    @Autowired
    public UserService(UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            TokenService tokenService,
            @Lazy GroupMemberService groupMemberService,
            PaginationService paginationService,
            @Lazy TopicService topicService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
        this.groupMemberService = groupMemberService;
        this.paginationService = paginationService;
        this.topicService = topicService;
    }

    public boolean userExistsByEmail(String email) {
        Optional<User> user = this.userRepository.findByEmail(email);
        return user.isPresent();
    }

    public User getUserByEmail(String email) {
        return this.userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User with that email does not exist"));
    }

    public User getUserById(Long userId) {
        return this.userRepository.findById(userId)
                .orElseThrow(
                        () -> new NotFoundException(String.format("A user with the id %d does not exist", userId)));
    }

    public User getCurrentlyLoggedInUser() {
        Object principal = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        String username = ((UserDetails) principal).getUsername();
        User user = this.userRepository.findByEmail(username)
                .orElseThrow(() -> new NotFoundException("Current user was not found"));
        return user;
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Claims extractUserIdFromToken(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

    }

    public UserDto getUserByToken(String token) {
        Claims claims = extractUserIdFromToken(token);

        User user = getUserByEmail(claims.getSubject());
        return new UserDto(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole(),
                user.getAbbreviation(),
                user.getLoggedIn(),
                user.getProfile().getId(),
                user.getProfile().getAvatarUrl(),
                user.getFullName(),
                user.getSetting().getId(),
                user.getSlug());

    }

    public String updateUserEmail(String email, String password, Long userId) {
        if (userExistsByEmail(email)) {
            throw new BadRequestException("That email address is taken");
        }

        User user = getUserById(userId);

        if (user.getId() != getCurrentlyLoggedInUser().getId()) {
            throw new ForbiddenException("Cannot update another user's email");
        }

        if (!this.passwordEncoder.matches(password.trim(), user.getPassword())) {
            throw new ForbiddenException("Password is invalid");
        }

        user.setEmail(email);

        this.userRepository.save(user);

        return user.getEmail();
    }

    public void deleteUser(Long userId) {
        User user = getUserById(userId);

        if (user.getId() != getCurrentlyLoggedInUser().getId()) {
            throw new ForbiddenException("Cannot delete an another user's account");
        }

        this.tokenService.revokeAllUserTokens(user);

        this.userRepository.delete(user);
    }

    private void attachUserTopics(List<InviteeDto> invitees) {
        for (InviteeDto invitee : invitees) {
            List<TopicDto> topics = this.topicService.getTopicsByUserId(invitee.getUserId());
            invitee.setTopics(topics);
        }
    }

    public PaginationDto<InviteeDto> getUsers(int page, int pageSize, String direction, Long adminId, Long groupId) {

        List<Long> groupMemberIds = this.groupMemberService.getGroupMemberIdsFromGroup(groupId);
        Pageable pageable = this.paginationService.getPageable(page, pageSize, direction);
        Page<InviteeDto> result = this.userRepository.getInvitees(adminId, pageable, groupMemberIds);

        attachUserTopics(result.getContent());

        return new PaginationDto<InviteeDto>(
                result.getContent(),
                result.getNumber(),
                pageSize,
                result.getTotalPages(),
                direction,
                result.getTotalElements());

    }

    public PaginationDto<SearchUserDto> getUsersBySearch(String fullName, Long groupId, int page, int pageSize,
            String direction) {
        if (fullName.trim().length() == 0) {
            throw new BadRequestException("Please provide a search term");
        }
        List<Long> groupMemberIds = this.groupMemberService.getGroupMemberIdsFromGroup(groupId);
        Pageable pageable = this.paginationService.getPageable(page, pageSize, direction);
        Page<SearchUserDto> result = this.userRepository.queryUsersByFullName(fullName.toLowerCase(), groupMemberIds,
                pageable);

        return new PaginationDto<SearchUserDto>(
                result.getContent(),
                result.getNumber(),
                pageSize,
                result.getTotalPages(),
                direction,
                result.getTotalElements());

    }
}
