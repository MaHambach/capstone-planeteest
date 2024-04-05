package com.github.mahambach.backend.controller;

import com.github.mahambach.backend.model.AppUserRegister;
import com.github.mahambach.backend.model.AppUserResponse;
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

    @GetMapping("/me")
    public AppUserResponse getAppUserByUsername() {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return appUserService.findAppUserByUsername(principal.getUsername());
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

    @PutMapping("/{appUserId}")
    public AppUserResponse updateAppUser(@PathVariable String appUserId,
                                         @RequestBody AppUserResponse appUserResponse) {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return appUserService.updateAppUser(principal.getUsername(), appUserId, appUserResponse);
    }

    @PutMapping("/{appUserId}/add-my-world-map/{worldMapId}")
    public AppUserResponse addMyWorldMapAppUser(@PathVariable String appUserId,
                                         @PathVariable String worldMapId) {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return appUserService.addMyWorldMapAppUser(principal.getUsername(), appUserId, worldMapId);
    }
    @PutMapping("/{appUserId}/add-observed/{worldMapId}")
    public AppUserResponse addObservedWorldMapAppUser(@PathVariable String appUserId,
                                         @PathVariable String worldMapId) {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return appUserService.addObservedWorldMapAppUser(principal.getUsername(), appUserId, worldMapId);
    }
}
