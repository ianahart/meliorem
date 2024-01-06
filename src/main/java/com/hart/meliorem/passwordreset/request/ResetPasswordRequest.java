package com.hart.meliorem.passwordreset.request;

import jakarta.validation.constraints.NotNull;

public class ResetPasswordRequest {

    @NotNull(message = "Id cannot be null")
    private Long id;
    @NotNull(message = "Token cannot be null")
    private String token;
    private String newPassword;
    private String confirmPassword;

    public ResetPasswordRequest() {

    }

    public ResetPasswordRequest(Long id, String token, String newPassword, String confirmPassword) {
        this.id = id;
        this.token = token;
        this.newPassword = newPassword;
        this.confirmPassword = confirmPassword;
    }

    public Long getId() {
        return id;
    }

    public String getToken() {
        return token;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
