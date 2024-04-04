package com.github.mahambach.backend.controller;

import com.github.mahambach.backend.model.AppUser;
import com.github.mahambach.backend.model.AppUserDto;
import com.github.mahambach.backend.service.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/app-users")
@RequiredArgsConstructor
public class AppUserController {
    private final AppUserService appUserService;

    @GetMapping("/{username}")
    public AppUser getAppUserByUsername(@PathVariable String username) {
        return appUserService.findAppUserByUsername(username);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AppUserDto createAppUser(@RequestBody AppUserDto appUserDto) {
        return appUserService.createAppUser(appUserDto);
    }

    @PostMapping("/login")
    public void login(){
        // This is a dummy method to simulate a login.
    }
}
