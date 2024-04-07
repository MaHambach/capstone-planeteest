package com.github.mahambach.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.mahambach.backend.model.AppUserRegister;
import com.github.mahambach.backend.model.AppUserResponse;
import jakarta.servlet.http.HttpSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AppUserControllerTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;


    @Test
    void getAppUserByUsername_whenLoggedInUser_expectUser() throws Exception  {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return appUserService.findAppUserByUsername(principal.getUsername());
    }

    @Test
    void createAppUser() throws Exception  {
        return appUserService.createAppUser(appUserRegister);
    }

    @Test
    void login(){
        // This is a dummy method to simulate a login.
    }

    @Test
    void logout() throws Exception {
        session.invalidate();
        SecurityContextHolder.clearContext();
    }

    @Test
    void updateAppUser() throws Exception  {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return appUserService.updateAppUser(principal.getUsername(), appUserId, appUserResponse);
    }

    @Test
    void addMyWorldMapAppUser() throws Exception  {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return appUserService.addMyWorldMapAppUser(principal.getUsername(), appUserId, worldMapId);
    }
    @Test
    void addObservedWorldMapAppUser() throws Exception  {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return appUserService.addObservedWorldMapAppUser(principal.getUsername(), appUserId, worldMapId);
    }
}
