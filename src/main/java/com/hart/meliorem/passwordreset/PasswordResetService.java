package com.hart.meliorem.passwordreset;

import com.hart.meliorem.user.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PasswordResetService {

    private final PasswordResetRepository passwordResetRepository;

    @Autowired
    public PasswordResetService(PasswordResetRepository passwordResetRepository) {
        this.passwordResetRepository = passwordResetRepository;
    }

    public void savePasswordReset(User user, String token) {
        if (token != null && user != null) {
            this.passwordResetRepository.save(new PasswordReset(token, user));
        }
    }

    public void deletePasswordResetsById(Long id) {
        this.passwordResetRepository.deleteUserPasswordResetsById(id);
    }

}
