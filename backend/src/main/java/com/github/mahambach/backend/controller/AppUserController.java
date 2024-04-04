package com.github.mahambach.backend.controller;

import com.github.mahambach.backend.model.AppUser;
import com.github.mahambach.backend.model.AppUserRegister;
import com.github.mahambach.backend.model.AppUserResponse;
import com.github.mahambach.backend.service.AppUserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/app-users")
@RequiredArgsConstructor
public class AppUserController {
    private final AppUserService appUserService;

    @GetMapping("/{username}")
    public AppUserResponse getAppUserByUsername(@PathVariable String username) {
        return appUserService.findAppUserByUsername(username);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AppUserResponse createAppUser(@RequestBody AppUserRegister appUserRegister) {
        return appUserService.createAppUser(appUserRegister);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void login(){
        // This is a dummy method to simulate a login.
    }

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout(HttpSession session){
        session.invalidate();
        SecurityContextHolder.clearContext();
    }
}
