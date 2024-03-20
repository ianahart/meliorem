package com.hart.meliorem.bookprogress;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hart.meliorem.bookprogress.request.CreateOrUpdateBookProgressRequest;
import com.hart.meliorem.bookprogress.response.CreateOrUpdateBookProgressResponse;
import com.hart.meliorem.bookprogress.response.GetBookProgressesResponse;

@RestController
@RequestMapping(path = "/api/v1/book-progresses")
public class BookProgressController {

    private final BookProgressService bookProgressService;

    @Autowired
    public BookProgressController(BookProgressService bookProgressService) {
        this.bookProgressService = bookProgressService;
    }

    @PostMapping("")
    ResponseEntity<CreateOrUpdateBookProgressResponse> createOrUpdateBookProgress(
            @RequestBody CreateOrUpdateBookProgressRequest request) {

        this.bookProgressService.createOrUpdateBookProgress(request);
        return ResponseEntity.status(HttpStatus.OK).body(new CreateOrUpdateBookProgressResponse("success"));
    }

    @GetMapping("")
    ResponseEntity<GetBookProgressesResponse> getBookProgresses(@RequestParam("userId") Long userId,
            @RequestParam("page") int page, @RequestParam("pageSize") int pageSize,
            @RequestParam("direction") String direction) {

        return ResponseEntity.status(HttpStatus.OK).body(new GetBookProgressesResponse("success",
                this.bookProgressService.getBookProgresses(userId, page, pageSize, direction)));
    }
}
