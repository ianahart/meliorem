package com.hart.meliorem.bookprogress;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hart.meliorem.book.Book;
import com.hart.meliorem.book.BookService;
import com.hart.meliorem.bookprogress.dto.BookProgressDto;
import com.hart.meliorem.bookprogress.dto.FullBookProgressDto;
import com.hart.meliorem.bookprogress.request.CreateOrUpdateBookProgressRequest;
import com.hart.meliorem.advice.NotFoundException;
import com.hart.meliorem.pagination.PaginationService;
import com.hart.meliorem.pagination.dto.PaginationDto;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;

@Service
public class BookProgressService {

    private final UserService userService;

    private final PaginationService paginationService;

    private final BookService bookService;

    private final BookProgressRepository bookProgressRepository;

    @Autowired
    public BookProgressService(
            UserService userService,
            PaginationService paginationService,
            BookService bookService,
            BookProgressRepository bookProgressRepository) {
        this.userService = userService;
        this.paginationService = paginationService;
        this.bookService = bookService;
        this.bookProgressRepository = bookProgressRepository;
    }

    public BookProgress getBookProgressById(Long bookProgressId) {
        return this.bookProgressRepository
                .findById(bookProgressId)
                .orElseThrow(() -> new NotFoundException(
                        String.format("Book progress with the id %d was not found", bookProgressId)));
    }

    private boolean isBookInProgress(Long userId, Long bookId) {

        try {
            BookProgressDto exists = this.bookProgressRepository.getBookProgressByUserIdAndBookId(userId, bookId)
                    .getFirst();
            if (exists != null) {
                return true;
            }
            return false;
        } catch (NoSuchElementException e) {

            return false;
        }
    }

    public void createBookProgress(CreateOrUpdateBookProgressRequest request) {
        User user = this.userService.getCurrentlyLoggedInUser();
        Book book = this.bookService.getBookById(request.getBookId());
        Boolean isCompleted = false;

        BookProgress bookProgress = new BookProgress(request.getCurrentPage(),
                request.getTotalPages(),
                isCompleted,
                request.getNotes(), user, book);

        this.bookProgressRepository.save(bookProgress);

    }

    public void updateBookProgress(CreateOrUpdateBookProgressRequest request) {
        Long bookProgressId = this.bookProgressRepository
                .getBookProgressByUserIdAndBookId(request.getUserId(), request.getBookId()).getFirst().getId();
        BookProgress bookProgress = getBookProgressById(bookProgressId);

        bookProgress.setCurrentPage(request.getCurrentPage());
        bookProgress.setTotalPages(request.getTotalPages());
        bookProgress.setNotes(request.getNotes());
        bookProgress.setIsCompleted(false);

        this.bookProgressRepository.save(bookProgress);

    }

    public void createOrUpdateBookProgress(CreateOrUpdateBookProgressRequest request) {

        if (isBookInProgress(request.getUserId(), request.getBookId())) {
            updateBookProgress(request);
        } else {
            createBookProgress(request);
        }
    }

    public PaginationDto<FullBookProgressDto> getBookProgresses(Long userId, int page, int pageSize, String direction) {
        Pageable pageable = this.paginationService.getPageable(page, pageSize, direction);
        Page<FullBookProgressDto> result = this.bookProgressRepository.getBookProgressesByUserId(userId, pageable);

        return new PaginationDto<FullBookProgressDto>(
                result.getContent(),
                result.getNumber(),
                pageSize,
                result.getTotalPages(),
                direction,
                result.getTotalElements());
    }
}
