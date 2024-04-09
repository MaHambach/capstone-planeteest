package com.github.mahambach.backend.controller;

import com.github.mahambach.backend.model.AppUserRegister;
import com.github.mahambach.backend.model.AppUserResponse;
import com.github.mahambach.backend.model.AppUserUpdateObject;
import com.github.mahambach.backend.model.RemoveObservedRequest;
import com.github.mahambach.backend.service.AppUserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class AppUserController {
    private final AppUserService appUserService;

    @GetMapping
    public List<AppUserResponse> getAllAppUsers() {
        return appUserService.getAllAppUsers();
    }

    @GetMapping("/me")
    public AppUserResponse getAppUserByUsername() {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return appUserService.findAppUserByUsername(principal.getUsername());
    }

    @GetMapping("/observers/{worldMapId}")
    public List<AppUserResponse> getAllObserversOfWorldMapById(@PathVariable String worldMapId) {
        return appUserService.getAllObserversOfWorldMapById(worldMapId);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AppUserResponse createAppUser(@RequestBody AppUserRegister appUserRegister) {
        return appUserService.createAppUser(appUserRegister);
    }

    @PostMapping("/login")
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

    @PutMapping("/add-my-world-map")
    public AppUserResponse addMyWorldMapAppUser(@RequestBody String worldMapId) {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return appUserService.addMyWorldMapAppUser(principal.getUsername(), worldMapId);
    }
    @PutMapping("/add-observed")
    public AppUserResponse addObservedWorldMapAppUser(@RequestBody String worldMapId) {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return appUserService.addObservedWorldMapAppUser(principal.getUsername(), worldMapId);
    }

    @PutMapping("/remove-observed")
    public AppUserResponse removeObservedWorldMapAppUser(@RequestBody RemoveObservedRequest removeObservedRequest) {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return appUserService.removeObservedWorldMapAppUser(principal.getUsername(), removeObservedRequest.observerName(), removeObservedRequest.worldMapId());
    }
}
