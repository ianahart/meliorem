package com.hart.meliorem.studyset;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hart.meliorem.studysetcard.StudySetCard;
import com.hart.meliorem.user.User;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;

@Entity()
@Table(name = "studyset")
public class StudySet {

    @Id
    @SequenceGenerator(name = "studyset_sequence", sequenceName = "studyset_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "studyset_sequence")
    @Column(name = "id")
    private Long id;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "course", length = 200)
    private String course;

    @Column(name = "description", length = 350)
    private String description;

    @Column(name = "folder", length = 200)
    private String folder;

    @Column(name = "school_name", length = 200)
    private String schoolName;

    @Enumerated(EnumType.STRING)
    private Visibility visibility;

    @Column(name = "title", length = 200)
    private String title;

    @ManyToOne()
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @OneToMany(mappedBy = "studySet", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudySetCard> studySetCards;

    public StudySet() {

    }

    public StudySet(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            String course,
            String description,
            String folder,
            String schoolName,
            String title,
            Visibility visibility) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.course = course;
        this.description = description;
        this.folder = folder;
        this.schoolName = schoolName;
        this.title = title;
        this.visibility = visibility;
    }

    public StudySet(
            String course,
            String description,
            String folder,
            String schoolName,
            String title,
            Visibility visibility,
            User user) {
        this.course = course;
        this.description = description;
        this.folder = folder;
        this.user = user;
        this.schoolName = schoolName;
        this.title = title;
        this.visibility = visibility;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getTitle() {
        return title;
    }

    public String getCourse() {
        return course;
    }

    public List<StudySetCard> getStudySetCards() {
        return studySetCards;
    }

    public String getFolder() {
        return folder;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public String getDescription() {
        return description;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public Visibility getVisibility() {
        return visibility;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setFolder(String folder) {
        this.folder = folder;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public void setVisibility(Visibility visibility) {
        this.visibility = visibility;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setStudySetCards(List<StudySetCard> studySetCards) {
        this.studySetCards = studySetCards;
    }
}
