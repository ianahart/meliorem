package com.hart.meliorem.authentication;

import java.io.IOException;

import com.hart.meliorem.authentication.request.LoginRequest;
import com.hart.meliorem.authentication.request.RegisterRequest;
import com.hart.meliorem.authentication.response.LoginResponse;
import com.hart.meliorem.authentication.response.RegisterResponse;
import com.hart.meliorem.config.JwtService;
import com.hart.meliorem.email.EmailService;
import com.hart.meliorem.email.request.ForgotPasswordRequest;
import com.hart.meliorem.email.response.ForgotPasswordResponse;
import com.hart.meliorem.refreshtoken.RefreshToken;
import com.hart.meliorem.refreshtoken.RefreshTokenService;
import com.hart.meliorem.refreshtoken.request.RefreshTokenRequest;
import com.hart.meliorem.refreshtoken.response.RefreshTokenResponse;
import com.hart.meliorem.token.TokenService;
import com.hart.meliorem.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import freemarker.template.TemplateException;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/api/v1/auth")
public class AuthenticationController {

    @Value("${DEFAULT_TTL}")
    private Long DEFAULT_TTL;

    private final AuthenticationService authenticationService;
    private final RefreshTokenService refreshTokenService;
    private final JwtService jwtService;
    private final TokenService tokenService;
    private final UserService userService;
    private final EmailService emailService;

    @Autowired
    public AuthenticationController(
            AuthenticationService authenticationService,
            RefreshTokenService refreshTokenService,
            JwtService jwtService,
            TokenService tokenService,
            UserService userService,
            EmailService emailService) {
        this.authenticationService = authenticationService;
        this.refreshTokenService = refreshTokenService;
        this.jwtService = jwtService;
        this.tokenService = tokenService;
        this.userService = userService;
        this.emailService = emailService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
            @RequestBody @Valid RegisterRequest request) {
        this.authenticationService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(new RegisterResponse("success"));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(this.authenticationService.login(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<RefreshTokenResponse> refresh(@RequestBody RefreshTokenRequest request) {
        RefreshToken refreshToken = this.refreshTokenService.verifyRefreshToken(request.getRefreshToken());

        this.tokenService.revokeAllUserTokens(refreshToken.getUser());
        String token = this.jwtService.generateToken(refreshToken.getUser(), DEFAULT_TTL);
        this.authenticationService.saveTokenWithUser(token, refreshToken.getUser());

        return ResponseEntity.status(200).body(
                new RefreshTokenResponse(token, refreshToken.getRefreshToken()));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ForgotPasswordResponse> forgotPassword(@RequestBody ForgotPasswordRequest request)
            throws IOException,
            TemplateException, MessagingException {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(this.emailService.sendForgotPasswordEmail(request));
    }

}
