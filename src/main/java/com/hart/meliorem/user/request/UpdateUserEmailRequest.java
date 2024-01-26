package com.hart.meliorem.user.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class UpdateUserEmailRequest {

    @NotNull
    @Size(min = 1, max = 200, message = "Email must be between 1 and 200 characters")
    private String email;

    @NotNull
    @Size(min = 1, max = 200, message = "Password must be between 1 and 200 characters")
    private String password;

    public UpdateUserEmailRequest() {

    }

    public UpdateUserEmailRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
