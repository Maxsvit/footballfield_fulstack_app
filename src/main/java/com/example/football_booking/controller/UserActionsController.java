package com.example.football_booking.controller;

import com.example.football_booking.model.User;
import com.example.football_booking.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserActionsController {

    private final UserService userService;

    public UserActionsController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<User> getUserProfile() {
        return ResponseEntity.ok(userService.getAuthenticatedUser());
    }
}
