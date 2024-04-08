package com.github.mahambach.backend.controller;

import com.github.mahambach.backend.model.AppUserRegister;
import com.github.mahambach.backend.model.AppUserResponse;
import com.github.mahambach.backend.model.AppUserUpdateObject;
import com.github.mahambach.backend.service.AppUserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class AppUserController {
    private final AppUserService appUserService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AppUserResponse createAppUser(@RequestBody AppUserRegister appUserRegister) {
        return appUserService.createAppUser(appUserRegister);
    }

    @GetMapping("/me")
    public AppUserResponse getAppUserByUsername() {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return appUserService.findAppUserByUsername(principal.getUsername());
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public AppUserResponse login(){
        return getAppUserByUsername();
    }

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout(HttpSession session){
        session.invalidate();
        SecurityContextHolder.clearContext();
    }

    @PutMapping
    public AppUserResponse updateAppUser(@RequestBody AppUserUpdateObject appUserUpdateObject) {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return appUserService.updateAppUser(principal.getUsername(), appUserUpdateObject);
    }

    @PutMapping("/add-my-world-map/{worldMapId}")
    public AppUserResponse addMyWorldMapAppUser(@PathVariable String worldMapId) {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return appUserService.addMyWorldMapAppUser(principal.getUsername(), worldMapId);
    }
    @PutMapping("/add-observed/{worldMapId}")
    public AppUserResponse addObservedWorldMapAppUser(@PathVariable String worldMapId) {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return appUserService.addObservedWorldMapAppUser(principal.getUsername(), worldMapId);
    }
}
