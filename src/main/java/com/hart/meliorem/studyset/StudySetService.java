package com.hart.meliorem.studyset;

import java.util.List;
import java.util.ArrayList;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.hart.meliorem.advice.NotFoundException;
import com.hart.meliorem.advice.BadRequestException;

import com.hart.meliorem.pagination.PaginationService;
import com.hart.meliorem.pagination.dto.PaginationDto;
import com.hart.meliorem.studyset.dto.StudySetDto;
import com.hart.meliorem.studyset.dto.StudySetFolderDto;
import com.hart.meliorem.studyset.request.CreateStudySetRequest;
import com.hart.meliorem.studysetcard.StudySetCardService;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;

@Service
public class StudySetService {

    private final StudySetRepository studySetRepository;
    private final UserService userService;
    private final StudySetCardService studySetCardService;
    private final PaginationService paginationService;

    public StudySetService(StudySetRepository studySetRepository,
            UserService userService,
            @Lazy StudySetCardService studySetCardService,
            PaginationService paginationService) {
        this.studySetRepository = studySetRepository;
        this.userService = userService;
        this.studySetCardService = studySetCardService;
        this.paginationService = paginationService;
    }

    public StudySet findStudySetById(Long studySetId) {
        return this.studySetRepository.findById(studySetId).orElseThrow(
                () -> new NotFoundException(String.format("A study set with the id %d was not found", studySetId)));
    }

    public void createStudySet(CreateStudySetRequest request) {

        User user = this.userService.getCurrentlyLoggedInUser();
        Visibility visibility = request.getVisibility().equals("me") ? Visibility.ME
                : Visibility.EVERYONE;
        StudySet studySet = new StudySet(
                Jsoup.clean(request.getCourse(), Safelist.none()),
                Jsoup.clean(request.getDescription(), Safelist.none()),
                Jsoup.clean(request.getFolder(), Safelist.none()),
                Jsoup.clean(request.getSchoolName(), Safelist.none()),
                Jsoup.clean(request.getTitle(), Safelist.none()),
                visibility,
                user);

        this.studySetRepository.save(studySet);

        this.studySetCardService.createStudySetCards(request.getCards(), user, studySet);
    }

    public List<StudySetFolderDto> getStudySetFolders(String query, int limit, int page, String direction) {
        Long userId = this.userService.getCurrentlyLoggedInUser().getId();

        Pageable pageable = this.paginationService.getPageable(page, limit, direction);

        Page<String> result = this.studySetRepository.findAllDistinctFoldersByUserId(userId,
                Jsoup.clean(query.toLowerCase(), Safelist.none()),
                pageable);

        List<StudySetFolderDto> studySetFolders = new ArrayList<>();

        for (String studySetFolder : result.getContent()) {
            studySetFolders.add(new StudySetFolderDto(studySetFolder));
        }

        return studySetFolders;
    }

    public PaginationDto<StudySetDto> getStudySets(Long userId, int page, int pageSize, String direction) {
        Pageable pageable = this.paginationService.getPageable(page, pageSize, direction);

        Page<StudySetDto> result = userId == 0 ? this.studySetRepository.findAllStudySets(pageable)
                : this.studySetRepository.findAllStudySetsByUserId(userId, pageable);

        for (StudySetDto studySet : result.getContent()) {
            studySet.setTotalStudySetCards(this.studySetCardService.countStudySetCards(studySet.getId()));
        }

        return new PaginationDto<StudySetDto>(
                result.getContent(),
                result.getNumber(),
                pageSize,
                result.getTotalPages(),
                direction,
                result.getTotalElements());

    }

    public StudySetDto getStudySet(Long studySetId) {

        if (studySetId == null) {
            throw new BadRequestException("Missing resouce id");
        }

        StudySetDto studySet = this.studySetRepository.findStudySetById(studySetId);

        if (studySet == null) {
            throw new NotFoundException("A study set with the id " + studySetId + " was not found");
        }
        return studySet;

    }
}
