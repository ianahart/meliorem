package com.hart.meliorem.studysetcard.dto;

public class StudySetCardFullDto {

    private Object id;

    private Integer number;

    private Integer order;

    private String term;

    private String image;

    private String definition;

    private String color;

    private String bgColor;

    private Boolean starred;

    public StudySetCardFullDto() {

    }

    public StudySetCardFullDto(
            Object id,
            Integer number,
            Integer order,
            String term,
            String image,
            String definition,
            String color,
            String bgColor,
            Boolean starred) {
        this.id = id;
        this.number = number;
        this.order = order;
        this.term = term;
        this.image = image;
        this.definition = definition;
        this.color = color;
        this.bgColor = bgColor;
        this.starred = starred;
    }

    public Object getId() {
        return id;
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

    public Boolean getStarred() {
        return starred;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDefinition() {
        return definition;
    }

    public void setDefinition(String definition) {
        this.definition = definition;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getBgColor() {
        return bgColor;
    }

    public void setBgColor(String bgColor) {
        this.bgColor = bgColor;
    }

    public void setId(Object id) {
        this.id = id;
    }

    public void setStarred(Boolean starred) {
        this.starred = starred;
    }
}
