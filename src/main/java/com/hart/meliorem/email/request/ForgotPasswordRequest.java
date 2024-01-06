package com.hart.meliorem.email.request;

import jakarta.validation.constraints.Email;

public class ForgotPasswordRequest {

    @Email
    private String email;

    public ForgotPasswordRequest() {

    }

    public ForgotPasswordRequest(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
