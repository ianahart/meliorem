package com.hart.meliorem.authentication;

import com.hart.meliorem.advice.BadRequestException;
import com.hart.meliorem.authentication.request.LoginRequest;
import com.hart.meliorem.authentication.request.RegisterRequest;
import com.hart.meliorem.authentication.response.LoginResponse;
import com.hart.meliorem.authentication.response.RegisterResponse;
import com.hart.meliorem.config.JwtService;
import com.hart.meliorem.profile.ProfileService;
import com.hart.meliorem.refreshtoken.RefreshToken;
import com.hart.meliorem.refreshtoken.RefreshTokenService;
import com.hart.meliorem.setting.SettingService;
import com.hart.meliorem.token.Token;
import com.hart.meliorem.token.TokenRepository;
import com.hart.meliorem.token.TokenService;
import com.hart.meliorem.token.TokenType;
import com.hart.meliorem.user.Role;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserRepository;
import com.hart.meliorem.user.UserService;
import com.hart.meliorem.user.dto.UserDto;
import com.hart.meliorem.util.MyUtil;
import com.hart.meliorem.advice.ForbiddenException;
import com.hart.meliorem.advice.NotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;

@Service
public class AuthenticationService {

    @Value("${DEFAULT_TTL}")
    private Long DEFAULT_TTL;

    private final PasswordEncoder passwordEncoder;
    private final ProfileService profileService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final TokenRepository tokenRepository;
    private final RefreshTokenService refreshTokenService;
    private final TokenService tokenService;
    private final UserService userService;
    private final SettingService settingService;

    @Autowired
    public AuthenticationService(
            PasswordEncoder passwordEncoder,
            ProfileService profileService,
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            JwtService jwtService,
            TokenRepository tokenRepository,
            RefreshTokenService refreshTokenService,
            TokenService tokenService,
            UserService userService,
            SettingService settingService) {
        this.passwordEncoder = passwordEncoder;
        this.profileService = profileService;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
        this.refreshTokenService = refreshTokenService;
        this.tokenService = tokenService;
        this.userService = userService;
        this.settingService = settingService;
    }

    private void validateRegistration(RegisterRequest request) {
        if (this.userService.userExistsByEmail(request.getEmail())) {
            throw new BadRequestException("A user with this email already exists");
        }

        if (!MyUtil.validatePassword(request.getPassword())) {

            throw new BadRequestException(
                    "Password must contain 1 letter, 1 number, 1 special char, and 1 uppercase letter");
        }

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("Passwords do not match");
        }
    }

    public RegisterResponse register(RegisterRequest request) {
        validateRegistration(request);

        Role role = Role.USER;

        if (this.userRepository.countUsers() == 0) {
            role = Role.ADMIN;
        }

        String firstName = MyUtil.capitalize(request.getFirstName());
        String lastName = MyUtil.capitalize(request.getLastName());
        User user = new User(
                Jsoup.clean(request.getEmail(), Safelist.none()),
                Jsoup.clean(firstName, Safelist.none()),
                Jsoup.clean(lastName, Safelist.none()),
                String.format("%s %s", firstName, lastName),
                role,
                false,
                this.profileService.createProfile(),
                this.passwordEncoder.encode(request.getPassword()),
                this.settingService.createSetting());
        this.userRepository.save(user);
        return new RegisterResponse("User created");
    }

    public void saveTokenWithUser(String token, User user) {
        Token tokenToSave = new Token(token, TokenType.BEARER, false, false, user);
        this.tokenRepository.save(tokenToSave);

    }

    private UserDto updateAuthUser(User user, String jwtToken) {

        user.setLoggedIn(true);

        this.userRepository.save(user);
        this.saveTokenWithUser(jwtToken, user);

        return new UserDto(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole(),
                user.getAbbreviation(),
                user.getLoggedIn(),
                user.getProfile().getId(),
                user.getProfile().getAvatarUrl(),
                user.getFullName(),
                user.getSetting().getId(),
                user.getSlug());

    }

    public LoginResponse login(LoginRequest request) {

        try {
            this.authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            Jsoup.clean(request.getEmail(), Safelist.none()),
                            Jsoup.clean(request.getPassword(), Safelist.none())));

        } catch (BadCredentialsException e) {
            throw new ForbiddenException("Credentials are invalid");
        }
        User user = this.userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new NotFoundException("User not found by email."));

        String jwtToken = this.jwtService.generateToken(user, DEFAULT_TTL);

        this.tokenService.revokeAllUserTokens(user);
        UserDto userDto = this.updateAuthUser(user, jwtToken);
        RefreshToken refreshToken = this.refreshTokenService.generateRefreshToken(user.getId());

        return new LoginResponse(userDto, jwtToken, refreshToken.getRefreshToken());
    }

}
