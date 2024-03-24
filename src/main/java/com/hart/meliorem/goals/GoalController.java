package com.hart.meliorem.goals;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hart.meliorem.goals.request.CreateGoalRequest;
import com.hart.meliorem.goals.request.MarkGoalCompleteRequest;
import com.hart.meliorem.goals.request.UpdateGoalRequest;
import com.hart.meliorem.goals.response.CreateGoalResponse;
import com.hart.meliorem.goals.response.DeleteGoalResponse;
import com.hart.meliorem.goals.response.GetGoalResponse;
import com.hart.meliorem.goals.response.GetGoalsResponse;
import com.hart.meliorem.goals.response.MarkGoalCompleteResponse;
import com.hart.meliorem.goals.response.UpdateGoalResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/api/v1/goals")
public class GoalController {

    private final GoalService goalService;

    @Autowired
    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @PostMapping("")
    ResponseEntity<CreateGoalResponse> createGoal(@RequestBody @Valid CreateGoalRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new CreateGoalResponse("success", this.goalService.createGoal(request)));
    }

    @GetMapping("")
    ResponseEntity<GetGoalsResponse> getGoals(@RequestParam(name = "page", required = true) int page,
            @RequestParam(name = "pageSize", required = true) int pageSize,
            @RequestParam(name = "direction", required = true) String direction,
            @RequestParam(name = "subject", required = false) String subject,
            @RequestParam(name = "filter", required = false) String filter,
            @RequestParam(name = "completion", required = false) Boolean completion) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GetGoalsResponse("success",
                        this.goalService.getGoals(page, pageSize, direction, subject, filter, completion)));
    }

    @GetMapping("/{goalId}")
    ResponseEntity<GetGoalResponse> getGoal(@PathVariable("goalId") Long goalId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GetGoalResponse("success", this.goalService.getGoal(goalId)));
    }

    @PutMapping("/{goalId}")
    ResponseEntity<UpdateGoalResponse> updateGoal(@PathVariable("goalId") Long goalId,
            @RequestBody @Valid UpdateGoalRequest request) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new UpdateGoalResponse("success", this.goalService.updateGoal(goalId, request)));
    }

    @DeleteMapping("/{goalId}")
    ResponseEntity<DeleteGoalResponse> deleteGoal(@PathVariable("goalId") Long goalId) {
        this.goalService.deleteGoal(goalId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new DeleteGoalResponse("success"));
    }

    @PatchMapping("/{goalId}")
    ResponseEntity<MarkGoalCompleteResponse> markGoalComplete(
            @PathVariable("goalId") Long goalId, @RequestBody MarkGoalCompleteRequest request) {

        this.goalService.markGoalComplete(goalId, request.getIsCompleted());

        return ResponseEntity.status(HttpStatus.OK).body(new MarkGoalCompleteResponse("success"));
    }
}
