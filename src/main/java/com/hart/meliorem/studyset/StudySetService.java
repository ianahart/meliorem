package com.hart.meliorem.studyset;

import java.util.List;
import java.util.ArrayList;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hart.meliorem.studyset.dto.StudySetFolderDto;
import com.hart.meliorem.studyset.request.CreateStudySetRequest;
import com.hart.meliorem.studysetcard.StudySetCardService;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;
import com.hart.meliorem.util.MyUtil;

@Service
public class StudySetService {

    private final StudySetRepository studySetRepository;
    private final UserService userService;
    private final StudySetCardService studySetCardService;

    public StudySetService(StudySetRepository studySetRepository,
            UserService userService,
            @Lazy StudySetCardService studySetCardService) {
        this.studySetRepository = studySetRepository;
        this.userService = userService;
        this.studySetCardService = studySetCardService;
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
        int currentPage = MyUtil.paginate(page, direction);

        Pageable pageable = PageRequest.of(currentPage, limit);
        Page<String> result = this.studySetRepository.findAllDistinctFoldersByUserId(userId,
                Jsoup.clean(query.toLowerCase(), Safelist.none()),
                pageable);

        List<StudySetFolderDto> studySetFolders = new ArrayList<>();

        for (String studySetFolder : result.getContent()) {
            studySetFolders.add(new StudySetFolderDto(studySetFolder));
        }

        return studySetFolders;
    }
}
