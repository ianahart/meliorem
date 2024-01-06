package com.hart.meliorem.email;

import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;

import com.hart.meliorem.config.JwtService;
import com.hart.meliorem.email.request.ForgotPasswordRequest;
import com.hart.meliorem.email.response.ForgotPasswordResponse;
import com.hart.meliorem.passwordreset.PasswordResetService;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserRepository;
import com.hart.meliorem.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import freemarker.template.Configuration;
import freemarker.template.TemplateException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final UserService userService;
    private final JwtService jwtService;
    private final Configuration configuration;
    private final JavaMailSender javaMailSender;
    private final PasswordResetService passwordResetService;

    @Value("${emailsender}")
    private String sender;

    @Value("${DEFAULT_TTL}")
    private Long DEFAULT_TTL;

    @Autowired
    public EmailService(
            UserService userService,
            JwtService jwtService,
            Configuration configuration,
            JavaMailSender javaMailSender,
            PasswordResetService passwordResetService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configuration = configuration;
        this.javaMailSender = javaMailSender;
        this.passwordResetService = passwordResetService;
    }

    private User getEmailRecipient(String email) {
        return this.userService.getUserByEmail(email);
    }

    public ForgotPasswordResponse sendForgotPasswordEmail(ForgotPasswordRequest request)
            throws MessagingException, IOException, TemplateException {
        User recipient = getEmailRecipient(request.getEmail());

        this.passwordResetService.deletePasswordResetsById(recipient.getId());

        this.javaMailSender.send(constructMessage(recipient));

        return new ForgotPasswordResponse(
                "Email sent successfully... If you do not see an email, check your spam folder.");

    }

    private MimeMessage constructMessage(User recipient) throws MessagingException,
            IOException, TemplateException {
        MimeMessage mimeMessage = this.javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);

        helper.setFrom(sender);
        helper.setSubject("Your password reset link");
        helper.setTo(recipient.getEmail());
        String emailContent = getEmailContent(recipient);

        helper.setText(emailContent, true);

        return mimeMessage;
    }

    private String getEmailContent(User user) throws IOException, TemplateException {
        String token = this.jwtService.generateToken(user, DEFAULT_TTL);
        this.passwordResetService.savePasswordReset(user, token);

        StringWriter stringWriter = new StringWriter();
        Map<String, Object> model = new HashMap<>();
        model.put("user", user);
        model.put("token", token);
        this.configuration.getTemplate("forgot-password-email.ftlh").process(model, stringWriter);
        return stringWriter.getBuffer().toString();
    }

}
