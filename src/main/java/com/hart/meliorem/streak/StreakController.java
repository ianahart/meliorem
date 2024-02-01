package com.hart.meliorem.streak;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hart.meliorem.streak.request.CreateStreakRequest;
import com.hart.meliorem.streak.response.CreateStreakResponse;
import com.hart.meliorem.streak.response.GetStreakResponse;

@RestController
@RequestMapping(path = "/api/v1/streaks")
public class StreakController {

    private final StreakService streakService;

    @Autowired
    public StreakController(StreakService streakService) {
        this.streakService = streakService;
    }

    @PostMapping("")
    public ResponseEntity<CreateStreakResponse> createStreak(@RequestBody CreateStreakRequest request) {

        this.streakService.createStreak(request.getStudySetId());

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new CreateStreakResponse("success"));
    }

    @GetMapping("")
    ResponseEntity<GetStreakResponse> getStreaks(@RequestParam("userId") Long userId) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GetStreakResponse("success", this.streakService.getStreaks(userId)));
    }
}