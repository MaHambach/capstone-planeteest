package com.github.mahambach.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.mahambach.backend.model.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
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
    void getAppUserByUsername_whenNotLoggedIn_thenIsUnauthorized() throws Exception  {
        // Given
        // When
        // Then
        mvc.perform(get("/api/users/me"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser
    void getAppUserByUsername_whenNoSuchUser_thenThrow() throws Exception {
        // Given
        // When
        MvcResult resultJson = mvc.perform(get("/api/users/me"))
                .andExpect(status().isNotFound())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), ErrorMessage.class);

        // Then
        assertEquals("User with username user not found.", result.errorMsg());
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

        AppUserUpdateObject appUserUpdateObject = new AppUserUpdateObject(appUserId, AppUserRole.ADMIN, List.of("1"), List.of("2"));
        String newAppUserResponseJson = objectMapper.writeValueAsString(appUserUpdateObject);

        // When
        MvcResult resultJson = mvc.perform(put("/api/users/")
                .contentType("application/json")
                .content(newAppUserResponseJson))
                .andExpect(status().isOk())
                .andReturn();

        AppUserResponse updatedAppUserResponse = objectMapper.readValue(resultJson.getResponse().getContentAsString(), AppUserResponse.class);

        // Then
        assertEquals(appUserId, updatedAppUserResponse.id());
        assertEquals(AppUserRole.ADMIN, updatedAppUserResponse.role());
        assertEquals("username", updatedAppUserResponse.username());
        assertEquals(List.of("1"), updatedAppUserResponse.myWorldMapIds());
        assertEquals(List.of("2"), updatedAppUserResponse.observedWorldMapIds());
    }


    @Test
    @WithMockUser
    void updateAppUser_whenNoSuchAppUser_thenThrowNoSuchAppUserException() throws Exception  {
        // Given
        AppUserResponse updateAppUser = new AppUserResponse("1", AppUserRole.ADMIN, "new username", List.of("1"), List.of("2"));
        String updateAppUserJson = objectMapper.writeValueAsString(updateAppUser);

        // When
        MvcResult resultJson = mvc.perform(put("/api/users/")
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

        AppUserUpdateObject appUserUpdateObject = new AppUserUpdateObject("2", AppUserRole.ADMIN, List.of("1"), List.of("2"));
        String updateAppUserJson = objectMapper.writeValueAsString(appUserUpdateObject);

        // When

        // Then
        MvcResult resultJson = mvc.perform(put("/api/users/")
                        .contentType("application/json")
                        .content(updateAppUserJson))
                .andExpect(status().isBadRequest())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), ErrorMessage.class);

        // Then
        assertEquals("User with id " + appUserId + " can't update user with id 2.", result.errorMsg());
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
