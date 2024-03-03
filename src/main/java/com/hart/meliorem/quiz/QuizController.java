package com.hart.meliorem.quiz;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hart.meliorem.quiz.request.CreateQuizRequest;
import com.hart.meliorem.quiz.request.GetQuizRequest;
import com.hart.meliorem.quiz.response.CreateQuizResponse;
import com.hart.meliorem.quiz.response.GetQuizResponse;
import com.hart.meliorem.quiz.response.GetQuizzesResponse;

@RestController
@RequestMapping(path = "/api/v1/quizzes")
public class QuizController {

    private final QuizService quizService;

    @Autowired
    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping("")
    public ResponseEntity<GetQuizResponse> getQuiz(@RequestBody GetQuizRequest request) throws IOException {

        return ResponseEntity.status(HttpStatus.OK).body(new GetQuizResponse("success",
                this.quizService.getQuiz(request.getQuizAPIUrl(), request.getTopicName())));
    }

    @PostMapping("/save")
    public ResponseEntity<CreateQuizResponse> createQuiz(@RequestBody CreateQuizRequest request) {

        this.quizService.createQuiz(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(new CreateQuizResponse("success"));
    }

    @GetMapping("")
    public ResponseEntity<GetQuizzesResponse> getQuizzes(@RequestParam("page") int page,
            @RequestParam("pageSize") int pageSize, @RequestParam("direction") String direction) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(new GetQuizzesResponse("success", this.quizService.getQuizzes(page, pageSize, direction)));
    }
}
