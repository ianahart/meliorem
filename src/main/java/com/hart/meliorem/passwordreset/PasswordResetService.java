package com.hart.meliorem.passwordreset;

import java.security.Key;

import com.hart.meliorem.config.JwtService;
import com.hart.meliorem.passwordreset.request.ResetPasswordRequest;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;
import com.hart.meliorem.util.MyUtil;
import com.hart.meliorem.advice.BadRequestException;
import com.hart.meliorem.advice.ForbiddenException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class PasswordResetService {

    private final PasswordResetRepository passwordResetRepository;
    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Value("${secretkey}")
    private String secretKey;

    @Autowired
    public PasswordResetService(
            PasswordResetRepository passwordResetRepository,
            UserService userService,
            JwtService jwtService,
            PasswordEncoder passwordEncoder) {
        this.passwordResetRepository = passwordResetRepository;
        this.userService = userService;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    public void savePasswordReset(User user, String token) {
        if (token != null && user != null) {
            this.passwordResetRepository.save(new PasswordReset(token, user));
        }
    }

    public void deletePasswordResetsById(Long id) {
        this.passwordResetRepository.deleteUserPasswordResetsById(id);
    }

    public void resetPassword(ResetPasswordRequest request) {
        Claims claims = extractUserIdFromToken(request.getToken());

        User user = this.userService.getUserByEmail(claims.getSubject());
        if (user.getId() != request.getId()) {
            throw new ForbiddenException("You cannot reset another user's password");
        }

        if (checkIfTokenExpired(request.getToken()) && passwordResetExists(request.getId(), request.getToken())) {
            throw new BadRequestException("Token has expired. Please try resetting your password again");
        }

        if (!MyUtil.validatePassword(request.getNewPassword())) {
            throw new BadRequestException("Password must include 1 uppercase, 1 lowercase, 1 digit and 1 special char");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("Passwords do not match");
        }

        user.setPassword(this.passwordEncoder.encode(request.getNewPassword()));

        deletePasswordResetsById(user.getId());
    }

    private boolean checkIfTokenExpired(String token) {
        return this.jwtService.tokenElapsedDay(token);
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Claims extractUserIdFromToken(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

    }

    private boolean passwordResetExists(Long userId, String token) {
        return this.passwordResetRepository.findPasswordResetByUserIdAndToken(userId, token);
    }
}
