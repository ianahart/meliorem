package com.hart.meliorem.studysetcard;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;

import com.hart.meliorem.studyset.StudySet;
import com.hart.meliorem.studysetcard.dto.StudySetCardDto;
import com.hart.meliorem.user.User;

@Service
public class StudySetCardService {

    private final StudySetCardRepository studySetCardRepository;

    public StudySetCardService(StudySetCardRepository studySetCardRepository) {
        this.studySetCardRepository = studySetCardRepository;
    }

    private StudySetCard constructStudySetCard(StudySetCardDto card, User user, StudySet studySet) {
        return new StudySetCard(
                Jsoup.clean(card.getBgColor(), Safelist.none()),
                Jsoup.clean(card.getColor(), Safelist.none()),
                Jsoup.clean(card.getDefinition(), Safelist.none()),
                Jsoup.clean(card.getImage(), Safelist.none()),
                card.getNumber(),
                card.getOrder(),
                Jsoup.clean(card.getTerm(), Safelist.none()),
                studySet,
                user);
    }

    public void createStudySetCards(List<StudySetCardDto> data, User user, StudySet studySet) {
        List<StudySetCard> studySetCards = new ArrayList<>();

        data.forEach(card -> {
            StudySetCard studySetCard = constructStudySetCard(card, user, studySet);

            studySetCards.add(studySetCard);
        });

        this.studySetCardRepository.saveAll(studySetCards);
    }

    public long countStudySetCards(Long studySetId) {
        return this.studySetCardRepository.countStudySetCardsByStudySetId(studySetId);
    }

}
