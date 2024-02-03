package com.hart.meliorem.studysetcard;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.ArrayList;

import com.hart.meliorem.advice.NotFoundException;
import com.hart.meliorem.advice.BadRequestException;
import com.hart.meliorem.advice.ForbiddenException;

import com.hart.meliorem.studyset.StudySet;
import com.hart.meliorem.studysetcard.dto.StudySetCardDto;
import com.hart.meliorem.studysetcard.dto.StudySetCardFullDto;
import com.hart.meliorem.studysetcard.request.EditStudySetCardRequest;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;

@Service
public class StudySetCardService {

    private Integer MAX_STUDYSET_CARDS = 10;

    private final StudySetCardRepository studySetCardRepository;

    private final UserService userService;

    @Autowired
    public StudySetCardService(StudySetCardRepository studySetCardRepository,
                    UserService userService) {
        this.studySetCardRepository = studySetCardRepository;
        this.userService = userService;
    }

    public StudySetCard findStudySetCardById(Long studySetCardId) {
        return this.studySetCardRepository.findById(studySetCardId).orElseThrow(() -> new NotFoundException(
                String.format("A studySetCardId with the id %d was not found.", studySetCardId)));
    }

    private StudySetCard constructStudySetCard(StudySetCardDto card, User user, StudySet studySet) {
        Boolean starred = false;
        return new StudySetCard(
                Jsoup.clean(card.getBgColor(), Safelist.none()),
                Jsoup.clean(card.getColor(), Safelist.none()),
                Jsoup.clean(card.getDefinition(), Safelist.none()),
                Jsoup.clean(card.getImage(), Safelist.none()),
                card.getNumber(),
                card.getOrder(),
                Jsoup.clean(card.getTerm(), Safelist.none()),
                starred,
                studySet,
                user);
    }

    private StudySetCard constructStudySetCardForEdit(StudySetCardFullDto card, User user, StudySet studySet) {
        Boolean starred = false;
        return new StudySetCard(
                Jsoup.clean(card.getBgColor(), Safelist.none()),
                Jsoup.clean(card.getColor(), Safelist.none()),
                Jsoup.clean(card.getDefinition(), Safelist.none()),
                Jsoup.clean(card.getImage(), Safelist.none()),
                card.getNumber(),
                card.getOrder(),
                Jsoup.clean(card.getTerm(), Safelist.none()),
                starred,
                studySet,
                user);
    }

    @Transactional
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

    public List<StudySetCardFullDto> getStudySetCardsFull(Long studySetId) {
        return this.studySetCardRepository.getStudySetCardsFullByStudySetId(studySetId);
    }

    public List<StudySetCardDto> getStudySetCards(Long studySetId) {

        return this.studySetCardRepository.getStudySetCardsByStudySetId(studySetId);
    }

    public void editStudySetCards(List<StudySetCardFullDto> cards, StudySet studySet, User user) {

        if (cards.size() > MAX_STUDYSET_CARDS) {
            throw new BadRequestException("You can only have 10 cards");
        }

        for (StudySetCardFullDto card : cards) {
            if (card.getId() instanceof String) {

                StudySetCard studySetCard = constructStudySetCardForEdit(card, user, studySet);
                this.studySetCardRepository.save(studySetCard);

            } else {
                Long cardId = Long.valueOf(String.valueOf(card.getId()));
                StudySetCard cardEntity = this.findStudySetCardById(cardId);

                cardEntity.setTerm(Jsoup.clean(card.getTerm(), Safelist.none()));
                cardEntity.setColor(Jsoup.clean(card.getColor(), Safelist.none()));
                cardEntity.setImage(card.getImage());
                cardEntity.setOrder(card.getOrder());
                cardEntity.setNumber(card.getNumber());
                cardEntity.setBgColor(card.getBgColor());
                cardEntity.setDefinition(Jsoup.clean(card.getDefinition(), Safelist.none()));

                this.studySetCardRepository.save(cardEntity);

            }
        }
    }

    public void deleteStudySetCard(String studySetCardId) {
        try {
            StudySetCard studySetCard = findStudySetCardById(Long.valueOf(studySetCardId));

            if (studySetCard != null) {

                this.studySetCardRepository.delete(studySetCard);
            }

        } catch (NumberFormatException e) {
            System.out.println("deleteStudySetCard() studySetCardId is a string from nanoid");
        }
    }

    public void editStudySetCard(Long studySetCardId, EditStudySetCardRequest request) {

        User currentUser = this.userService.getCurrentlyLoggedInUser();
        StudySetCard studySetCard = findStudySetCardById(studySetCardId);

        if (currentUser.getId() != studySetCard.getUser().getId()) {
            throw new ForbiddenException("You are not authorized to edit this study set card");
        }

        studySetCard.setTerm(Jsoup.clean(request.getTerm(), Safelist.none()));
        studySetCard.setDefinition(Jsoup.clean(request.getDefinition(), Safelist.none()));

        this.studySetCardRepository.save(studySetCard);

    }

}
