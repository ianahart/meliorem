package com.hart.meliorem.user;

import com.hart.meliorem.advice.NotFoundException;
import com.hart.meliorem.user.dto.UserDto;
import com.hart.meliorem.user.request.UpdateUserEmailRequest;
import com.hart.meliorem.user.response.UpdateUserEmailResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/api/v1/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/sync")
    public ResponseEntity<UserDto> syncUser(HttpServletRequest request) {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new NotFoundException("Invalid header token");
        }
        return ResponseEntity.status(200).body(this.userService.getUserByToken(authHeader.substring(7)));
    }

    @PatchMapping("/{userId}/email")
    public ResponseEntity<UpdateUserEmailResponse> updateEmail(@Valid @RequestBody UpdateUserEmailRequest request,
            @PathVariable("userId") Long userId) {

        return ResponseEntity.status(HttpStatus.OK).body(new UpdateUserEmailResponse("success",
                this.userService.updateUserEmail(request.getEmail(), request.getPassword(), userId)));
    }
}
