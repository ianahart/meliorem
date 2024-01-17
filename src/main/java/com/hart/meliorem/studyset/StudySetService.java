package com.hart.meliorem.studyset;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.hart.meliorem.studyset.request.CreateStudySetRequest;
import com.hart.meliorem.studysetcard.StudySetCardService;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;

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
}
