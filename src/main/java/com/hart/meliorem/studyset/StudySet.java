package com.hart.meliorem.studyset;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hart.meliorem.bookmark.BookMark;
import com.hart.meliorem.groupstudyset.GroupStudySet;
import com.hart.meliorem.note.Note;
import com.hart.meliorem.recommendation.Recommendation;
import com.hart.meliorem.review.Review;
import com.hart.meliorem.streak.Streak;
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

    @OneToMany(mappedBy = "studySet", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Streak> streaks;

    @OneToMany(mappedBy = "studySet", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;

    @OneToMany(mappedBy = "studySet", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BookMark> bookMarks;

    @OneToMany(mappedBy = "studySet", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Note> notes;

    @OneToMany(mappedBy = "studySet", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GroupStudySet> groupStudySets;

    @OneToMany(mappedBy = "studySet", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Recommendation> recommendations;

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

    public List<GroupStudySet> getGroupStudySets() {
        return groupStudySets;
    }

    public List<Streak> getStreaks() {
        return streaks;
    }

    public List<Recommendation> getRecommendations() {
        return recommendations;
    }

    public List<BookMark> getBookMarks() {
        return bookMarks;
    }

    public User getUser() {
        return user;
    }

    public List<Review> getReviews() {
        return reviews;
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

    public List<Note> getNotes() {
        return notes;
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

    public void setRecommendations(List<Recommendation> recommendations) {
        this.recommendations = recommendations;
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

    public void setStreaks(List<Streak> streaks) {
        this.streaks = streaks;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public void setBookMarks(List<BookMark> bookMarks) {
        this.bookMarks = bookMarks;
    }

    public void setNotes(List<Note> notes) {
        this.notes = notes;
    }

    public void setGroupStudySets(List<GroupStudySet> groupStudySets) {
        this.groupStudySets = groupStudySets;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((createdAt == null) ? 0 : createdAt.hashCode());
        result = prime * result + ((updatedAt == null) ? 0 : updatedAt.hashCode());
        result = prime * result + ((course == null) ? 0 : course.hashCode());
        result = prime * result + ((description == null) ? 0 : description.hashCode());
        result = prime * result + ((folder == null) ? 0 : folder.hashCode());
        result = prime * result + ((schoolName == null) ? 0 : schoolName.hashCode());
        result = prime * result + ((visibility == null) ? 0 : visibility.hashCode());
        result = prime * result + ((title == null) ? 0 : title.hashCode());
        result = prime * result + ((user == null) ? 0 : user.hashCode());
        result = prime * result + ((studySetCards == null) ? 0 : studySetCards.hashCode());
        result = prime * result + ((streaks == null) ? 0 : streaks.hashCode());
        result = prime * result + ((reviews == null) ? 0 : reviews.hashCode());
        result = prime * result + ((bookMarks == null) ? 0 : bookMarks.hashCode());
        result = prime * result + ((notes == null) ? 0 : notes.hashCode());
        result = prime * result + ((groupStudySets == null) ? 0 : groupStudySets.hashCode());
        result = prime * result + ((recommendations == null) ? 0 : recommendations.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        StudySet other = (StudySet) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (createdAt == null) {
            if (other.createdAt != null)
                return false;
        } else if (!createdAt.equals(other.createdAt))
            return false;
        if (updatedAt == null) {
            if (other.updatedAt != null)
                return false;
        } else if (!updatedAt.equals(other.updatedAt))
            return false;
        if (course == null) {
            if (other.course != null)
                return false;
        } else if (!course.equals(other.course))
            return false;
        if (description == null) {
            if (other.description != null)
                return false;
        } else if (!description.equals(other.description))
            return false;
        if (folder == null) {
            if (other.folder != null)
                return false;
        } else if (!folder.equals(other.folder))
            return false;
        if (schoolName == null) {
            if (other.schoolName != null)
                return false;
        } else if (!schoolName.equals(other.schoolName))
            return false;
        if (visibility != other.visibility)
            return false;
        if (title == null) {
            if (other.title != null)
                return false;
        } else if (!title.equals(other.title))
            return false;
        if (user == null) {
            if (other.user != null)
                return false;
        } else if (!user.equals(other.user))
            return false;
        if (studySetCards == null) {
            if (other.studySetCards != null)
                return false;
        } else if (!studySetCards.equals(other.studySetCards))
            return false;
        if (streaks == null) {
            if (other.streaks != null)
                return false;
        } else if (!streaks.equals(other.streaks))
            return false;
        if (reviews == null) {
            if (other.reviews != null)
                return false;
        } else if (!reviews.equals(other.reviews))
            return false;
        if (bookMarks == null) {
            if (other.bookMarks != null)
                return false;
        } else if (!bookMarks.equals(other.bookMarks))
            return false;
        if (notes == null) {
            if (other.notes != null)
                return false;
        } else if (!notes.equals(other.notes))
            return false;
        if (groupStudySets == null) {
            if (other.groupStudySets != null)
                return false;
        } else if (!groupStudySets.equals(other.groupStudySets))
            return false;
        if (recommendations == null) {
            if (other.recommendations != null)
                return false;
        } else if (!recommendations.equals(other.recommendations))
            return false;
        return true;
    }


}
