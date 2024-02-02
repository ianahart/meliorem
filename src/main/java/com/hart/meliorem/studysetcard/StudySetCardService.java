package com.hart.meliorem.studysetcard;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.ArrayList;

import com.hart.meliorem.advice.NotFoundException;
import com.hart.meliorem.advice.BadRequestException;

import com.hart.meliorem.studyset.StudySet;
import com.hart.meliorem.studysetcard.dto.StudySetCardDto;
import com.hart.meliorem.studysetcard.dto.StudySetCardFullDto;
import com.hart.meliorem.user.User;

@Service
public class StudySetCardService {

    private Integer MAX_STUDYSET_CARDS = 10;

    private final StudySetCardRepository studySetCardRepository;

    public StudySetCardService(StudySetCardRepository studySetCardRepository) {
        this.studySetCardRepository = studySetCardRepository;
    }

    public StudySetCard findStudySetCardById(Long studySetCardId) {
        return this.studySetCardRepository.findById(studySetCardId).orElseThrow(() -> new NotFoundException(
                String.format("A studySetCardId with the id %d was not found.", studySetCardId)));
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

    private StudySetCard constructStudySetCardForEdit(StudySetCardFullDto card, User user, StudySet studySet) {
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

        System.out.println(cards.size());
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

}
