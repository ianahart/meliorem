package com.hart.meliorem.studyset.response;

public class CreateStudySetResponse {

  private String message;

  public CreateStudySetResponse() {

  }

  public CreateStudySetResponse(String message) {
    this.message = message;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }
}
