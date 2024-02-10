package com.hart.meliorem.bookmark;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hart.meliorem.advice.BadRequestException;
import com.hart.meliorem.advice.NotFoundException;
import com.hart.meliorem.bookmark.dto.BookMarkDto;
import com.hart.meliorem.bookmark.dto.BookMarkFullDto;
import com.hart.meliorem.pagination.PaginationService;
import com.hart.meliorem.pagination.dto.PaginationDto;
import com.hart.meliorem.studyset.StudySet;
import com.hart.meliorem.studyset.StudySetService;
import com.hart.meliorem.studysetcard.StudySetCardService;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;

@Service
public class BookMarkService {

    private final BookMarkRepository bookMarkRepository;

    private final UserService userService;

    private final StudySetService studySetService;

    private final PaginationService paginationService;

    private final StudySetCardService studySetCardService;

    @Autowired
    public BookMarkService(
            BookMarkRepository bookMarkRepository,
            UserService userService,
            StudySetService studySetService,
            PaginationService paginationService,
            @Lazy StudySetCardService studySetCardService) {
        this.bookMarkRepository = bookMarkRepository;
        this.userService = userService;
        this.studySetService = studySetService;
        this.paginationService = paginationService;
        this.studySetCardService = studySetCardService;
    }

    public BookMark getBookMarkById(Long bookMarkId) {
        return this.bookMarkRepository
                .findById(bookMarkId)
                .orElseThrow(
                        () -> new NotFoundException(
                                String.format("A bookmark with the id %d was not found", bookMarkId)));

    }

    private boolean checkIsBookMarked(Long userId, Long studySetId) {
        return this.bookMarkRepository.findBookMarkByUserIdAndStudySetId(userId, studySetId);
    }

    public BookMarkDto createBookMark(Long studySetId) {
        User user = this.userService.getCurrentlyLoggedInUser();
        StudySet studySet = this.studySetService.findStudySetById(studySetId);

        if (checkIsBookMarked(user.getId(), studySetId)) {
            throw new BadRequestException("You have already bookmarked this study set");
        }

        BookMark bookMark = new BookMark(user, studySet);

        this.bookMarkRepository.save(bookMark);

        return new BookMarkDto(bookMark.getId(), true);
    }

    public void deleteBookMark(Long bookMarkId) {
        BookMark bookMark = getBookMarkById(bookMarkId);
        User user = this.userService.getCurrentlyLoggedInUser();

        if (bookMark.getUser().getId() == user.getId()) {
            this.bookMarkRepository.delete(bookMark);
        }
    }

    private List<BookMarkFullDto> attachStudySetOwner(List<BookMarkFullDto> bookMarks) {
        for (BookMarkFullDto bookMark : bookMarks) {
            User studySetOwner = this.studySetService.findStudySetById(bookMark.getStudySetId()).getUser();

            bookMark.setAvatarUrl(studySetOwner.getProfile().getAvatarUrl());
            bookMark.setFullName(studySetOwner.getFullName());
            bookMark.setTotalStudySetCards(this.studySetCardService.countStudySetCards(bookMark.getStudySetId()));
        }
        return bookMarks;

    }

    public PaginationDto<BookMarkFullDto> getAllBookMarks(Long userId, int page, int pageSize, String direction) {

        Pageable pageable = this.paginationService.getPageable(page, 3, direction);

        Page<BookMarkFullDto> result = this.bookMarkRepository.findAllBookMarksByUserId(userId, pageable);

        return new PaginationDto<BookMarkFullDto>(
                attachStudySetOwner(result.getContent()),
                result.getNumber(),
                pageSize,
                result.getTotalPages(),
                direction,
                result.getTotalElements());

    }

}
