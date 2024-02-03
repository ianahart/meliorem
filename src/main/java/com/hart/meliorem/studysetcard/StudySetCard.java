package com.hart.meliorem.studysetcard;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hart.meliorem.studyset.StudySet;
import com.hart.meliorem.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;

@Entity()
@Table(name = "studyset_card")
public class StudySetCard {

    @Id
    @SequenceGenerator(name = "studyset_card_sequence", sequenceName = "studyset_card_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "studyset_card_sequence")
    @Column(name = "id")
    private Long id;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "bg_color")
    private String bgColor;

    @Column(name = "color")
    private String color;

    @Column(name = "definition")
    private String definition;

    @Column(name = "image")
    private String image;

    @Column(name = "number")
    private Integer number;

    @Column(name = "_order")
    private Integer order;

    @Column(name = "term")
    private String term;

    @Column(name = "starred")
    private Boolean starred;

    @ManyToOne()
    @JoinColumn(name = "studyset_id", referencedColumnName = "id")
    private StudySet studySet;

    @ManyToOne()
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public StudySetCard() {

    }

    public StudySetCard(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            String bgColor,
            String color,
            String definition,
            String image,
            Integer number,
            Integer order,
            String term,
            Boolean starred) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.bgColor = bgColor;
        this.color = color;
        this.definition = definition;
        this.image = image;
        this.number = number;
        this.order = order;
        this.term = term;
        this.starred = starred;
    }

    public StudySetCard(
            String bgColor,
            String color,
            String definition,
            String image,
            Integer number,
            Integer order,
            String term,
            Boolean starred,
            StudySet studySet,
            User user) {
        this.bgColor = bgColor;
        this.color = color;
        this.definition = definition;
        this.image = image;
        this.number = number;
        this.order = order;
        this.term = term;
        this.starred = starred;
        this.studySet = studySet;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public Boolean getStarred() {
        return starred;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getBgColor() {
        return bgColor;
    }

    public void setBgColor(String bgColor) {
        this.bgColor = bgColor;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getDefinition() {
        return definition;
    }

    public void setDefinition(String definition) {
        this.definition = definition;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public StudySet getStudySet() {
        return studySet;
    }

    public void setStudySet(StudySet studySet) {
        this.studySet = studySet;
    }

    public User getUser() {
        return user;
    }

    public void setStarred(Boolean starred) {
        this.starred = starred;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
