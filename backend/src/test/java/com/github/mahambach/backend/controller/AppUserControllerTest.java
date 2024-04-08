package com.github.mahambach.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.mahambach.backend.model.AppUserRegister;
import com.github.mahambach.backend.model.AppUserResponse;
import com.github.mahambach.backend.model.AppUserRole;
import com.github.mahambach.backend.model.ErrorMessage;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AppUserControllerTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void createAppUser() throws Exception  {
        // Given
        AppUserRegister appUserRegister = new AppUserRegister("username", "password");
        String appUserRegisterJson = objectMapper.writeValueAsString(appUserRegister);

        // When
        MvcResult resultJson = mvc.perform(post("/api/users/register")
                .contentType("application/json")
                .content(appUserRegisterJson))
                .andExpect(status().isCreated())
                .andReturn();

        AppUserResponse appUserResponse = objectMapper.readValue(resultJson.getResponse().getContentAsString(), AppUserResponse.class);

        //Then
        assertEquals(appUserRegister.username(), appUserResponse.username());
        assertEquals(AppUserRole.USER, appUserResponse.role());
        assertNotNull(appUserResponse.id());
        assertTrue(appUserResponse.myWorldMapIds().isEmpty());
        assertTrue(appUserResponse.observedWorldMapIds().isEmpty());
    }


    @Test
    @WithMockUser(username = "username")
    void getAppUserByUsername_whenLoggedInUser_expectUser() throws Exception  {
        // Given
        AppUserRegister appUserRegister = new AppUserRegister("username", "password");
        String appUserRegisterJson = objectMapper.writeValueAsString(appUserRegister);
        mvc.perform(post("/api/users/register")
                        .contentType("application/json")
                        .content(appUserRegisterJson))
                .andExpect(status().isCreated());

        // When
        MvcResult resultJson = mvc.perform(get("/api/users/me"))
                .andExpect(status().isOk())
                .andReturn();

        AppUserResponse appUserResponse = objectMapper.readValue(resultJson.getResponse().getContentAsString(), AppUserResponse.class);

        // Then
        assertEquals(appUserRegister.username(), appUserResponse.username());
        assertEquals(AppUserRole.USER, appUserResponse.role());
        assertNotNull(appUserResponse.id());
        assertTrue(appUserResponse.myWorldMapIds().isEmpty());
        assertTrue(appUserResponse.observedWorldMapIds().isEmpty());
    }

    @Test
    void getAppUserByUsername_whenNotLoggedIn_expectIsUnauthorized() throws Exception  {
        // Given
        // When
        // Then
        mvc.perform(get("/api/users/me"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "username")
    void updateAppUser_whenSuchAppUser_thenUpdate() throws Exception  {
        // Given
        AppUserRegister appUserRegister = new AppUserRegister("username", "password");
        String appUserRegisterJson = objectMapper.writeValueAsString(appUserRegister);
        MvcResult json = mvc.perform(post("/api/users/register")
                        .contentType("application/json")
                        .content(appUserRegisterJson))
                .andExpect(status().isCreated())
                .andReturn();

        String appUserId = objectMapper.readValue(json.getResponse().getContentAsString(), AppUserResponse.class).id();

        AppUserResponse newAppUserResponse = new AppUserResponse(appUserId, AppUserRole.ADMIN, "new username", List.of("1"), List.of("2"));
        String newAppUserResponseJson = objectMapper.writeValueAsString(newAppUserResponse);

        // When
        MvcResult resultJson = mvc.perform(put("/api/users/" + appUserId)
                .contentType("application/json")
                .content(newAppUserResponseJson))
                .andExpect(status().isOk())
                .andReturn();

        AppUserResponse updatedAppUserResponse = objectMapper.readValue(resultJson.getResponse().getContentAsString(), AppUserResponse.class);

        // Then
        assertEquals(appUserId, updatedAppUserResponse.id());
        assertEquals(AppUserRole.ADMIN, updatedAppUserResponse.role());
        assertEquals("new username", updatedAppUserResponse.username());
        assertEquals(List.of("1"), updatedAppUserResponse.myWorldMapIds());
        assertEquals(List.of("2"), updatedAppUserResponse.observedWorldMapIds());
    }


    @Test
    @WithMockUser
    void updateAppUser_whenNoSuchAppUser_thenThrowNotFound() throws Exception  {
        // Given
        AppUserResponse updateAppUser = new AppUserResponse("1", AppUserRole.ADMIN, "new username", List.of("1"), List.of("2"));
        String updateAppUserJson = objectMapper.writeValueAsString(updateAppUser);

        // When
        MvcResult resultJson = mvc.perform(put("/api/users/1")
                        .contentType("application/json")
                        .content(updateAppUserJson))
                .andExpect(status().isNotFound())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), ErrorMessage.class);

        // Then
        assertEquals("User with id 1 not found.", result.errorMsg());
    }

    @Test
    @WithMockUser
    void updateAppUser_whenPathAndBodyIdMissMatch_thenThrowBadRequest() throws Exception  {
        // Given
        AppUserRegister appUserRegister = new AppUserRegister("user", "password");
        String appUserRegisterJson = objectMapper.writeValueAsString(appUserRegister);
        MvcResult json = mvc.perform(post("/api/users/register")
                        .contentType("application/json")
                        .content(appUserRegisterJson))
                .andExpect(status().isCreated())
                .andReturn();

        String appUserId = objectMapper.readValue(json.getResponse().getContentAsString(), AppUserResponse.class).id();

        AppUserResponse updateAppUser = new AppUserResponse("2", AppUserRole.ADMIN, "new username", List.of("1"), List.of("2"));
        String updateAppUserJson = objectMapper.writeValueAsString(updateAppUser);

        // When

        // Then
        MvcResult resultJson = mvc.perform(put("/api/users/" + appUserId)
                        .contentType("application/json")
                        .content(updateAppUserJson))
                .andExpect(status().isBadRequest())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), ErrorMessage.class);

        // Then
        assertEquals("User with id " + appUserId + " in path and 2 in body do not match.", result.errorMsg());
    }

    @Test
    @WithMockUser
    void addMyWorldMapAppUser() throws Exception  {

        /*
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return appUserService.addMyWorldMapAppUser(principal.getUsername(), appUserId, worldMapId);
         */
    }
    @Test
    @WithMockUser
    void addObservedWorldMapAppUser() throws Exception  {
        /*
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return appUserService.addObservedWorldMapAppUser(principal.getUsername(), appUserId, worldMapId);
         */
    }
}
