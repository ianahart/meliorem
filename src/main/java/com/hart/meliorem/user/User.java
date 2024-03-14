package com.hart.meliorem.user;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.hart.meliorem.book.Book;
import com.hart.meliorem.bookmark.BookMark;
import com.hart.meliorem.group.Group;
import com.hart.meliorem.groupmember.GroupMember;
import com.hart.meliorem.groupmessage.GroupMessage;
import com.hart.meliorem.groupstudyset.GroupStudySet;
import com.hart.meliorem.note.Note;
import com.hart.meliorem.notification.Notification;
import com.hart.meliorem.passwordreset.PasswordReset;
import com.hart.meliorem.profile.Profile;
import com.hart.meliorem.quiz.Quiz;
import com.hart.meliorem.refreshtoken.RefreshToken;
import com.hart.meliorem.review.Review;
import com.hart.meliorem.setting.Setting;
import com.hart.meliorem.streak.Streak;
import com.hart.meliorem.studyplan.StudyPlan;
import com.hart.meliorem.studyset.StudySet;
import com.hart.meliorem.studysetcard.StudySetCard;
import com.hart.meliorem.timeslot.TimeSlot;
import com.hart.meliorem.token.Token;
import com.hart.meliorem.topic.Topic;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;

@Entity()
@Table(name = "_user")
public class User implements UserDetails {

    @Id
    @SequenceGenerator(name = "_user_sequence", sequenceName = "_user_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_user_sequence")
    @Column(name = "id")
    private Long id;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "first_name", length = 200)
    private String firstName;

    @Column(name = "last_name", length = 200)
    private String lastName;

    @Column(name = "full_name", length = 400)
    private String fullName;

    @Column(name = "email", unique = true)
    private String email;

    @JsonProperty(access = Access.WRITE_ONLY)
    @Column(name = "password")
    private String password;

    @Column(name = "logged_in")
    private Boolean loggedIn;

    @Transient
    private String abbreviation;

    @Transient
    private String slug;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id", referencedColumnName = "id")
    private Profile profile;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "setting_id", referencedColumnName = "id")
    private Setting setting;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Token> tokens;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RefreshToken> refreshTokens;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PasswordReset> passwordResets;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudySet> studySets;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudySetCard> studySetCards;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Streak> streaks;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BookMark> bookMarks;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Note> notes;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Topic> topics;

    @OneToMany(mappedBy = "admin", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Group> adminGroups;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GroupMember> groupMembers;

    @OneToMany(mappedBy = "inviter", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GroupMember> inviters;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GroupStudySet> groupStudySets;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GroupMessage> groupMessages;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Notification> notifications;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Quiz> quizzes;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudyPlan> studyPlans;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TimeSlot> timeSlots;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Book> books;

    public User() {

    }

    public User(
            Long id,
            String email,
            Timestamp createdAt,
            Timestamp updatedAt,
            String firstName,
            String lastName,
            String fullName,
            Role role,
            Boolean loggedIn) {
        this.id = id;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = fullName;
        this.role = role;
        this.loggedIn = loggedIn;

    }

    public User(
            String email,
            String firstName,
            String lastName,
            String fullName,
            Role role,
            Boolean loggedIn,
            Profile profile,
            String password,
            Setting setting) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = fullName;
        this.role = role;
        this.loggedIn = loggedIn;
        this.profile = profile;
        this.password = password;
        this.setting = setting;
    }

    public String getAbbreviation() {
        return firstName.substring(0, 1).toUpperCase() + lastName.substring(0, 1).toUpperCase();
    }

    public String getSlug() {
        return (firstName + lastName).toLowerCase();
    }

    public List<Quiz> getQuizzes() {
        return quizzes;
    }

    public List<Topic> getTopics() {
        return topics;
    }

    public List<GroupStudySet> getGroupStudySets() {
        return groupStudySets;
    }

    public List<TimeSlot> getTimeSlots() {
        return timeSlots;
    }

    public List<StudyPlan> getStudyPlans() {
        return studyPlans;
    }

    public List<GroupMember> getInviters() {
        return inviters;
    }

    public List<GroupMember> getGroupMembers() {
        return groupMembers;
    }

    public List<Notification> getNotifications() {
        return notifications;
    }

    public List<GroupMessage> getGroupMessages() {
        return groupMessages;
    }

    public List<Note> getNotes() {
        return notes;
    }

    public List<Group> getAdminGroups() {
        return adminGroups;
    }

    public List<BookMark> getBookMarks() {
        return bookMarks;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public List<StudySetCard> getStudySetCards() {
        return studySetCards;
    }

    public List<StudySet> getStudySets() {
        return studySets;
    }

    public Long getId() {
        return id;
    }

    public List<RefreshToken> getRefreshTokens() {
        return refreshTokens;
    }

    public List<PasswordReset> getPasswordResets() {
        return passwordResets;
    }

    public List<Token> getTokens() {
        return tokens;
    }

    public List<Book> getBooks() {
        return books;
    }

    public Setting getSetting() {

        return setting;
    }

    public Profile getProfile() {
        return profile;
    }

    public Role getRole() {
        return role;
    }

    public String getEmail() {
        return email;
    }

    public String getFullName() {
        return fullName;
    }

    public String getLastName() {
        return lastName;
    }

    public Boolean getLoggedIn() {
        return loggedIn;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public String getFirstName() {
        return firstName;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public List<Streak> getStreaks() {
        return streaks;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setInviters(List<GroupMember> inviters) {
        this.inviters = inviters;
    }

    public void setGroupMembers(List<GroupMember> groupMembers) {
        this.groupMembers = groupMembers;
    }

    public void setAdminGroups(List<Group> adminGroups) {
        this.adminGroups = adminGroups;
    }

    public void setGroupStudySets(List<GroupStudySet> groupStudySets) {
        this.groupStudySets = groupStudySets;
    }

    public void setGroupMessages(List<GroupMessage> groupMessages) {
        this.groupMessages = groupMessages;
    }

    public void setStudyPlans(List<StudyPlan> studyPlans) {
        this.studyPlans = studyPlans;
    }

    public void setStudySetCards(List<StudySetCard> studySetCards) {
        this.studySetCards = studySetCards;
    }

    public void setPasswordResets(List<PasswordReset> passwordResets) {
        this.passwordResets = passwordResets;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public void setTopics(List<Topic> topics) {
        this.topics = topics;
    }

    public void setSetting(Setting setting) {
        this.setting = setting;
    }

    public void setRefreshTokens(List<RefreshToken> refreshTokens) {
        this.refreshTokens = refreshTokens;
    }

    public void setTokens(List<Token> tokens) {
        this.tokens = tokens;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setLoggedIn(Boolean loggedIn) {
        this.loggedIn = loggedIn;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setNotes(List<Note> notes) {
        this.notes = notes;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setStudySets(List<StudySet> studySets) {
        this.studySets = studySets;
    }

    public void setNotifications(List<Notification> notifications) {
        this.notifications = notifications;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getUsername() {
        return email;
    }

    public void setTimeSlots(List<TimeSlot> timeSlots) {
        this.timeSlots = timeSlots;
    }

    public void setStreaks(List<Streak> streaks) {
        this.streaks = streaks;
    }

    public void setQuizzes(List<Quiz> quizzes) {
        this.quizzes = quizzes;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public void setBookMarks(List<BookMark> bookMarks) {
        this.bookMarks = bookMarks;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

}
