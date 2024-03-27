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

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((createdAt == null) ? 0 : createdAt.hashCode());
        result = prime * result + ((updatedAt == null) ? 0 : updatedAt.hashCode());
        result = prime * result + ((bgColor == null) ? 0 : bgColor.hashCode());
        result = prime * result + ((color == null) ? 0 : color.hashCode());
        result = prime * result + ((definition == null) ? 0 : definition.hashCode());
        result = prime * result + ((image == null) ? 0 : image.hashCode());
        result = prime * result + ((number == null) ? 0 : number.hashCode());
        result = prime * result + ((order == null) ? 0 : order.hashCode());
        result = prime * result + ((term == null) ? 0 : term.hashCode());
        result = prime * result + ((starred == null) ? 0 : starred.hashCode());
        result = prime * result + ((studySet == null) ? 0 : studySet.hashCode());
        result = prime * result + ((user == null) ? 0 : user.hashCode());
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
        StudySetCard other = (StudySetCard) obj;
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
        if (bgColor == null) {
            if (other.bgColor != null)
                return false;
        } else if (!bgColor.equals(other.bgColor))
            return false;
        if (color == null) {
            if (other.color != null)
                return false;
        } else if (!color.equals(other.color))
            return false;
        if (definition == null) {
            if (other.definition != null)
                return false;
        } else if (!definition.equals(other.definition))
            return false;
        if (image == null) {
            if (other.image != null)
                return false;
        } else if (!image.equals(other.image))
            return false;
        if (number == null) {
            if (other.number != null)
                return false;
        } else if (!number.equals(other.number))
            return false;
        if (order == null) {
            if (other.order != null)
                return false;
        } else if (!order.equals(other.order))
            return false;
        if (term == null) {
            if (other.term != null)
                return false;
        } else if (!term.equals(other.term))
            return false;
        if (starred == null) {
            if (other.starred != null)
                return false;
        } else if (!starred.equals(other.starred))
            return false;
        if (studySet == null) {
            if (other.studySet != null)
                return false;
        } else if (!studySet.equals(other.studySet))
            return false;
        if (user == null) {
            if (other.user != null)
                return false;
        } else if (!user.equals(other.user))
            return false;
        return true;
    }


}
