package com.hart.meliorem.studysetcard.dto;

public class StudySetCardDto {

  private Integer number;

  private Integer order;

  private String term;

  private String image;

  private String definition;

  private String color;

  private String bgColor;

  public StudySetCardDto() {

  }

  public StudySetCardDto(
      Integer number,
      Integer order,
      String term,
      String image,
      String definition,
      String color,
      String bgColor) {
    this.number = number;
    this.order = order;
    this.term = term;
    this.image = image;
    this.definition = definition;
    this.color = color;
    this.bgColor = bgColor;
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

}
