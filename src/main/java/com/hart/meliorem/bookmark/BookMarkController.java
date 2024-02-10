package com.hart.meliorem.bookmark;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hart.meliorem.bookmark.request.CreateBookMarkRequest;
import com.hart.meliorem.bookmark.response.CreateBookMarkResponse;
import com.hart.meliorem.bookmark.response.DeleteBookMarkResponse;

@RestController
@RequestMapping(path = "/api/v1/bookmarks")
public class BookMarkController {

    private final BookMarkService bookMarkService;

    public BookMarkController(BookMarkService bookMarkService) {
        this.bookMarkService = bookMarkService;
    }

    @PostMapping("")
    ResponseEntity<CreateBookMarkResponse> createBookMark(@RequestBody CreateBookMarkRequest request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new CreateBookMarkResponse("success",
                        this.bookMarkService.createBookMark(request.getStudySetId())));
    }

    @DeleteMapping("/{bookMarkId}")
    ResponseEntity<DeleteBookMarkResponse> deleteBookMark(@PathVariable("bookMarkId") Long bookMarkId) {

        this.bookMarkService.deleteBookMark(bookMarkId);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new DeleteBookMarkResponse("success"));
    }
}
