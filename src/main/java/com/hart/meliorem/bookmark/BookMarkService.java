package com.hart.meliorem.bookmark;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hart.meliorem.advice.BadRequestException;
import com.hart.meliorem.advice.NotFoundException;
import com.hart.meliorem.bookmark.dto.BookMarkDto;
import com.hart.meliorem.studyset.StudySet;
import com.hart.meliorem.studyset.StudySetService;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;

@Service
public class BookMarkService {

    private final BookMarkRepository bookMarkRepository;

    private final UserService userService;

    private final StudySetService studySetService;

    @Autowired
    public BookMarkService(
            BookMarkRepository bookMarkRepository,
            UserService userService,
            StudySetService studySetService) {
        this.bookMarkRepository = bookMarkRepository;
        this.userService = userService;
        this.studySetService = studySetService;
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

}
