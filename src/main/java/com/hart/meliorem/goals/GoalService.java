package com.hart.meliorem.goals;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.hart.meliorem.advice.BadRequestException;
import com.hart.meliorem.advice.NotFoundException;
import com.hart.meliorem.goals.dto.GoalDto;
import com.hart.meliorem.goals.request.CreateGoalRequest;
import com.hart.meliorem.goals.request.UpdateGoalRequest;
import com.hart.meliorem.pagination.PaginationService;
import com.hart.meliorem.pagination.dto.PaginationDto;
import com.hart.meliorem.advice.ForbiddenException;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class GoalService {

    private final PaginationService paginationService;

    private final GoalRepository goalRepository;

    private final UserService userService;

    @Autowired
    public GoalService(
            PaginationService paginationService,
            GoalRepository goalRepository,
            UserService userService) {
        this.paginationService = paginationService;
        this.goalRepository = goalRepository;
        this.userService = userService;
    }

    private Goal getGoalById(Long goalId) {
        return this.goalRepository.findById(goalId)
                .orElseThrow(
                        () -> new NotFoundException(String.format("A goal with the id %d does not exist", goalId)));
    }

    public GoalDto createGoal(CreateGoalRequest request) {
        try {
            User user = this.userService.getCurrentlyLoggedInUser();

            GoalType goalType = request.getGoalType().equals("reading") ? GoalType.READING : GoalType.FLASHCARDS;
            Boolean isCompleted = false;
            Goal newGoal = new Goal(
                    Jsoup.clean(request.getGoalTitle(), Safelist.none()),
                    Jsoup.clean(request.getGoalDesc(), Safelist.none()),
                    request.getGoalCompletionDate(),
                    isCompleted,
                    goalType,
                    user);

            this.goalRepository.save(newGoal);

            return this.goalRepository.getNewGoalByGoalId(newGoal.getId());

        } catch (DataIntegrityViolationException e) {
            e.printStackTrace();

            return null;
        }
    }

    public PaginationDto<GoalDto> getGoals(int page, int pageSize, String direction, String subject, String filter,
            Boolean completion) {
        Pageable pageable = null;
        Page<GoalDto> result = null;

        User user = this.userService.getCurrentlyLoggedInUser();

        if (filter.isEmpty() || completion == null) {
            pageable = this.paginationService.getPageable(page, pageSize, direction);
            result = this.goalRepository.getGoalsByDefault(pageable, user.getId());
        } else {
            int currentPage = this.paginationService.paginate(page, direction);
            Sort sortBy = filter.equals("ASC") ? Sort.by("createdAt").ascending() : Sort.by("createdAt").descending();

            pageable = PageRequest.of(currentPage, pageSize, sortBy);
            GoalType goalType = GoalType.valueOf(subject.toUpperCase());
            result = this.goalRepository.getGoalsByFilter(pageable, goalType,
                    completion, user.getId());

        }

        return new PaginationDto<GoalDto>(
                result.getContent(),
                result.getNumber(),
                pageSize,
                result.getTotalPages(),
                direction,
                result.getTotalElements());

    }

    public GoalDto getGoal(Long goalId) {
        try {
            User user = this.userService.getCurrentlyLoggedInUser();
            GoalDto goal = this.goalRepository.getNewGoalByGoalId(goalId);

            if (user.getId() != goal.getUserId()) {
                throw new ForbiddenException("Cannot view another person's goal");
            }

            return goal;

        } catch (EntityNotFoundException | ForbiddenException e) {
            e.printStackTrace();
            return null;
        }
    }

    public GoalDto updateGoal(Long goalId, UpdateGoalRequest request) {
        try {
            User user = this.userService.getCurrentlyLoggedInUser();
            Goal goal = getGoalById(goalId);

            if (user.getId() != goal.getUser().getId()) {
                throw new ForbiddenException("Cannot update another user's goal");
            }

            GoalType goalType = request.getGoalType().equals("reading") ? GoalType.READING : GoalType.FLASHCARDS;
            Boolean isCompleted = false;

            goal.setGoalTitle(Jsoup.clean(request.getGoalTitle(), Safelist.none()));
            goal.setGoalDesc(Jsoup.clean(request.getGoalDesc(), Safelist.none()));
            goal.setTargetCompletionDate(request.getGoalCompletionDate());
            goal.setIsCompleted(isCompleted);
            goal.setGoalType(goalType);
            goal.setUser(user);

            this.goalRepository.save(goal);

            return this.goalRepository.getNewGoalByGoalId(goal.getId());

        } catch (DataIntegrityViolationException e) {
            e.printStackTrace();

            return null;
        }
    }

    public void deleteGoal(Long goalId) {

        try {
            User user = this.userService.getCurrentlyLoggedInUser();
            Goal goal = getGoalById(goalId);

            if (user.getId() != goal.getUser().getId()) {
                throw new ForbiddenException("Cannot delete another user's goal");
            }

            this.goalRepository.delete(goal);

        } catch (ForbiddenException e) {
            throw e;

        } catch (EmptyResultDataAccessException e) {
            throw new BadRequestException(String.format("Could not find goal with id %d", goalId));
        }
    }

    public void markGoalComplete(Long goalId, Boolean isCompleted) {
        try {
            User user = this.userService.getCurrentlyLoggedInUser();
            Goal goal = getGoalById(goalId);

            if (user.getId() != goal.getUser().getId()) {
                throw new ForbiddenException("Cannot mark another user's goal complete or incomplete");
            }

            goal.setIsCompleted(isCompleted);

            this.goalRepository.save(goal);

        } catch (ForbiddenException e) {
            throw e;
        } catch (DataIntegrityViolationException e) {
            e.printStackTrace();
        }
    }
}
