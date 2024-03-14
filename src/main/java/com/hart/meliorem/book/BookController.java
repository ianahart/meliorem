package com.hart.meliorem.book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hart.meliorem.book.request.CreateBookRequest;
import com.hart.meliorem.book.response.CreateBookResponse;
import com.hart.meliorem.book.response.DeleteBookResponse;
import com.hart.meliorem.book.response.GetAllBookResponse;
import com.hart.meliorem.book.response.GetBookResponse;

@RestController
@RequestMapping(path = "/api/v1/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping("")
    ResponseEntity<CreateBookResponse> createBook(@RequestBody CreateBookRequest request) {

        this.bookService.makeRequestToGutendex(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new CreateBookResponse("success"));
    }

    @GetMapping("")
    ResponseEntity<GetAllBookResponse> getBooks(@RequestParam("page") int page, @RequestParam("pageSize") int pageSize,
            @RequestParam("direction") String direction) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GetAllBookResponse("success", this.bookService.getBooks(page, pageSize, direction)));
    }

    @GetMapping("/{bookId}")
    ResponseEntity<GetBookResponse> getBook(@PathVariable("bookId") Long bookId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new GetBookResponse("success", this.bookService.getBook(bookId)));

    }

    @DeleteMapping("/{bookId}")
    ResponseEntity<DeleteBookResponse> deleteBook(@PathVariable("bookId") Long bookId) {
        this.bookService.deleteBook(bookId);
        return ResponseEntity.status(HttpStatus.OK).body(new DeleteBookResponse("success"));
    }
}
