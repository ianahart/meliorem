package com.hart.meliorem.studyset;

import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.hart.meliorem.advice.NotFoundException;
import com.hart.meliorem.bookmark.BookMark;
import com.hart.meliorem.bookmark.dto.BookMarkDto;
import com.hart.meliorem.group.Group;
import com.hart.meliorem.group.GroupService;
import com.hart.meliorem.advice.BadRequestException;
import com.hart.meliorem.advice.ForbiddenException;
import com.hart.meliorem.pagination.PaginationService;
import com.hart.meliorem.pagination.dto.PaginationDto;
import com.hart.meliorem.studyset.dto.StudySetDto;
import com.hart.meliorem.studyset.dto.StudySetFolderDto;
import com.hart.meliorem.studyset.dto.StudySetMinDto;
import com.hart.meliorem.studyset.dto.StudySetPopulateDto;
import com.hart.meliorem.studyset.request.CreateStudySetRequest;
import com.hart.meliorem.studyset.request.EditStudySetRequest;
import com.hart.meliorem.studysetcard.StudySetCardService;
import com.hart.meliorem.studysetcard.dto.StudySetCardFullDto;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;
import com.hart.meliorem.util.MyUtil;

@Service
public class StudySetService {

    private final StudySetRepository studySetRepository;
    private final UserService userService;
    private final StudySetCardService studySetCardService;
    private final PaginationService paginationService;
    private final GroupService groupService;

    public StudySetService(StudySetRepository studySetRepository,
            UserService userService,
            @Lazy StudySetCardService studySetCardService,
            PaginationService paginationService,
            GroupService groupService) {
        this.studySetRepository = studySetRepository;
        this.userService = userService;
        this.studySetCardService = studySetCardService;
        this.paginationService = paginationService;
        this.groupService = groupService;
    }

    public StudySet findStudySetById(Long studySetId) {
        return this.studySetRepository.findById(studySetId).orElseThrow(
                () -> new NotFoundException(String.format("A study set with the id %d was not found", studySetId)));
    }

    public void createStudySet(CreateStudySetRequest request) {

        Integer MAX_STUDYSET_CARDS = 10;

        if (request.getCards().size() > MAX_STUDYSET_CARDS) {
            throw new BadRequestException("You can only have a mixum of 10 cards");
        }

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

        Page<String> result = this.studySetRepository.findAllDistinctFoldersByUserIdAndQuery(userId,
                Jsoup.clean(query.toLowerCase(), Safelist.none()),
                pageable);

        List<StudySetFolderDto> studySetFolders = new ArrayList<>();

        for (String studySetFolder : result.getContent()) {
            studySetFolders.add(new StudySetFolderDto(studySetFolder));
        }

        return studySetFolders;
    }

    private Page<StudySetDto> delegateGetStudySets(Page<StudySetDto> result, Long userId, String folder,
            Pageable pageable) {
        if (userId == 0) {

            result = this.studySetRepository.findAllStudySets(pageable);
        } else if (userId != 0 && folder == null) {

            result = this.studySetRepository.findAllStudySetsByUserId(userId, pageable);
        } else if (userId != 0 && folder != null) {

            String deslugifiedFolderName = MyUtil.deslugify(folder);
            result = this.studySetRepository.findAllStudySetsByUserIdAndFolder(userId, pageable,
                    deslugifiedFolderName.toLowerCase());
        }
        return result;

    }

    public PaginationDto<StudySetDto> getStudySets(Long userId, int page, int pageSize, String direction,
            String folder) {
        Pageable pageable = this.paginationService.getPageable(page, pageSize, direction);
        List<StudySetDto> list = new ArrayList<>();

        Page<StudySetDto> result = new PageImpl<StudySetDto>(list, pageable, list.size());

        result = delegateGetStudySets(result, userId, folder, pageable);

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

    private void attachBookMark(StudySetDto studySet, User user) {
        Optional<BookMark> bookMark = user.getBookMarks().stream()
                .filter(bm -> bm.getStudySet().getId() == studySet.getId())
                .findFirst();
        if (bookMark.isPresent()) {
            studySet.setBookMark(new BookMarkDto(bookMark.get().getId(), true));
        }
    }

    public StudySetDto getStudySet(Long studySetId) {

        User user = this.userService.getCurrentlyLoggedInUser();

        if (studySetId == null) {
            throw new BadRequestException("Missing resouce id");
        }

        StudySetDto studySet = this.studySetRepository.findStudySetById(studySetId);

        attachBookMark(studySet, user);

        if (studySet == null) {
            throw new NotFoundException("A study set with the id " + studySetId + " was not found");
        }
        return studySet;

    }

    public StudySetPopulateDto populateStudySet(Long studySetId) {
        if (studySetId == null) {
            throw new BadRequestException("Missing resouce id");
        }

        StudySetPopulateDto studySet = studySetRepository.populateStudySetById(studySetId);
        List<StudySetCardFullDto> studySetCards = studySetCardService.getStudySetCardsFull(studySetId);
        studySet.setCards(studySetCards);

        return studySet;

    }

    public void editStudySet(Long studySetId, EditStudySetRequest request) {
        StudySet studySet = findStudySetById(studySetId);

        Visibility visibility = request.getVisibility().equals("me") ? Visibility.ME
                : Visibility.EVERYONE;

        studySet.setVisibility(visibility);
        studySet.setCourse(Jsoup.clean(request.getCourse(), Safelist.none()));
        studySet.setDescription(Jsoup.clean(request.getDescription(), Safelist.none()));
        studySet.setFolder(Jsoup.clean(request.getFolder(), Safelist.none()));
        studySet.setSchoolName(Jsoup.clean(request.getSchoolName(), Safelist.none()));
        studySet.setTitle(Jsoup.clean(request.getTitle(), Safelist.none()));

        this.studySetCardService.editStudySetCards(request.getCards(), studySet, studySet.getUser());

        this.studySetRepository.save(studySet);

    }

    public void deleteStudySet(Long studySetId) {
        User currentUser = this.userService.getCurrentlyLoggedInUser();
        StudySet studySet = findStudySetById(studySetId);

        if (currentUser.getId() != studySet.getUser().getId()) {
            throw new ForbiddenException("You do not have the proper authorization to delete this studySet");
        }

        this.studySetRepository.delete(studySet);
    }

    public PaginationDto<StudySetFolderDto> getDistinctFolders(int page, int pageSize, String direction) {
        Long userId = this.userService.getCurrentlyLoggedInUser().getId();

        Pageable pageable = this.paginationService.getPageable(page, pageSize, direction);

        Page<String> result = this.studySetRepository.findAllDistinctFoldersByUserId(userId,
                pageable);

        List<StudySetFolderDto> studySetFolders = new ArrayList<>();

        for (String studySetFolder : result.getContent()) {
            studySetFolders.add(new StudySetFolderDto(studySetFolder));
        }

        return new PaginationDto<StudySetFolderDto>(
                studySetFolders,
                result.getNumber(),
                pageSize,
                result.getTotalPages(),
                direction,
                result.getTotalElements());

    }

    private void attachIsAddedToGroup(List<StudySetDto> studySets, Long groupId) {
        Group group = this.groupService.findGroupByGroupId(groupId);
        List<Long> studySetGroupIds = group.getGroupStudySets()
                .stream()
                .map(gss -> gss.getStudySet().getId()).toList();

        for (StudySetDto studySet : studySets) {
            if (studySetGroupIds.contains(studySet.getId())) {
                studySet.setIsAddedToGroup(true);
            } else {
                studySet.setIsAddedToGroup(false);
            }
        }
    }

    public PaginationDto<StudySetDto> searchStudySets(String query, Long groupId, int page, int pageSize,
            String direction) {

        Pageable pageable = this.paginationService.getPageable(page, pageSize, direction);
        Page<StudySetDto> result = this.studySetRepository.searchStudySets(query, pageable);

        attachIsAddedToGroup(result.getContent(), groupId);

        return new PaginationDto<StudySetDto>(
                result.getContent(),
                result.getNumber(),
                pageSize,
                result.getTotalPages(),
                direction,
                result.getTotalElements());

    }

    public List<StudySetMinDto> byUserId(Long userId) {
        return this.studySetRepository.findByUserId(userId);
    }

    public List<StudySetMinDto> getMatchingStudySetsBySchoolAndCourses(Long userId, List<String> courses,
            List<String> schoolNames) {

        return this.studySetRepository.getStudySetsBySchoolNameAndCourses(userId, courses, schoolNames);
    }

}
