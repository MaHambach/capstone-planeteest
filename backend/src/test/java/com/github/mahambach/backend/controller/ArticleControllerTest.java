package com.github.mahambach.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.mahambach.backend.model.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class ArticleControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser
    void getAllArticles_whenOneArticle_thenReturnThatArticleInAList() throws Exception {
        // Given
        ArticleDto articleDto = new ArticleDto("Content", List.of("NpcId1", "NpcId2"));
        String articleDtoJson = objectMapper.writeValueAsString(articleDto);

        MvcResult expectedJson = mvc.perform(post("/api/articles")
                        .contentType("application/json")
                        .content(articleDtoJson))
                .andExpect(status().isCreated())
                .andReturn();

        List<Article> expected = List.of(objectMapper.readValue(expectedJson.getResponse().getContentAsString(), Article.class));

        // When
        MvcResult resultJson = mvc.perform(get("/api/articles"))
                .andExpect(status().isOk())
                .andReturn();
        List<Article> result = List.of(objectMapper.readValue(resultJson.getResponse().getContentAsString(), Article[].class));

        // Then
        assertEquals(expected, result);
    }

    @Test
    void getAllArticles_whenEmpty_thenEmpty() throws Exception {
        // Given
        List<Article> expected = List.of();

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.get("/api/articles"))
                .andExpect(status().isOk())
                .andReturn();
        List<Article> result = List.of(objectMapper.readValue(resultJson.getResponse().getContentAsString(), Article[].class));

        // Then
        assertEquals(expected, result);
    }

    @Test
    void getArticleById_whenNoSuchArticle_thenThrow() throws Exception {
        // Given
        String id = "1";

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.get("/api/articles/" + id))
                .andExpect(status().isNotFound())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), ErrorMessage.class);

        // Then
        assertEquals("Article with id " + id + " not found.", result.errorMsg());
    }

    @Test
    void getArticleById_whenSuchArticle_thenReturn() throws Exception {
        // Given
        ArticleDto articleDto = new ArticleDto("Content", List.of("NpcId1", "NpcId2"));

        String articleDtoJson = objectMapper.writeValueAsString(articleDto);

        MvcResult expectedJson = mvc.perform(MockMvcRequestBuilders.post("/api/articles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(articleDtoJson))
                .andExpect(status().isCreated())
                .andReturn();

        Article expected = objectMapper.readValue(expectedJson.getResponse().getContentAsString(), Article.class);
        String id = expected.id();

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.get("/api/articles/" + id))
                .andExpect(status().isOk())
                .andReturn();

        Article result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), Article.class);

        // Then
        assertEquals(expected, result);
    }

    @Test
    void createArticle_whenValidInput_thenCreateAndReturn() throws Exception {
        // Given
        ArticleDto expectedDto = new ArticleDto("Content", List.of("NpcId1", "NpcId2"));

        String articleDtoJson = objectMapper.writeValueAsString(expectedDto);

        // When
        MvcResult expectedJson = mvc.perform(MockMvcRequestBuilders.post("/api/articles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(articleDtoJson))
                .andExpect(status().isCreated())
                .andReturn();

        Article actual = objectMapper.readValue(expectedJson.getResponse().getContentAsString(), Article.class);

        // Then
        assertEquals(expectedDto.content(), actual.content());
        assertEquals(expectedDto.npcIds(), actual.npcIds());
        assertNotNull(actual.id());
    }

    @Test
    void updateArticle_whenNoSuchArticle_thenThrow() throws Exception{
        // Given
        String id = "1";
        Article article = new Article("1", "Content", List.of("NpcId1", "NpcId2"));

        String articleJson = objectMapper.writeValueAsString(article);

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.put("/api/articles/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(articleJson))
                .andExpect(status().isNotFound())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), ErrorMessage.class);

        // Then
        assertEquals("Article with id " + id + " not found.", result.errorMsg());
    }


    @Test
    void updateArticle_whenPathAndBodyIdDiffer_thenThrow() throws Exception{
        // Given
        String id = "1";
        Article article = new Article("2", "Content", List.of("NpcId1", "NpcId2"));

        String articleJson = objectMapper.writeValueAsString(article);

        mvc.perform(MockMvcRequestBuilders.post("/api/articles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(articleJson))
                .andExpect(status().isCreated());

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.put("/api/articles/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(articleJson))
                .andExpect(status().isBadRequest())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), ErrorMessage.class);

        // Then
        assertEquals("Article with id 1 in path and 2 in body do not match.", result.errorMsg());
    }

    @Test
    void updateArticle_whenSuchArticle_thenUpdateAndReturn() throws Exception{
        // Given
        ArticleDto articleDto = new ArticleDto("Content", List.of("NpcId1", "NpcId2"));

        MvcResult articleOldJson = mvc.perform(MockMvcRequestBuilders.post("/api/articles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(articleDto)))
                .andExpect(status().isCreated())
                .andReturn();

        Article articleOld = objectMapper.readValue(articleOldJson.getResponse().getContentAsString(), Article.class);

        Article expected = articleOld.withContent("ContentNew").withNpcIds(List.of("NpcId1New", "NpcId2New"));

        // When
        MvcResult actualJson = mvc.perform(MockMvcRequestBuilders.put("/api/articles/" + expected.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(expected)))
                .andExpect(status().isOk())
                .andReturn();

        Article actual = objectMapper.readValue(actualJson.getResponse().getContentAsString(), Article.class);

        // Then
        assertEquals(expected, actual);
    }

    @Test
    void deleteArticleById_whenNoSuchArticle_thenThrow() throws Exception {
        // Given
        String id = "1";

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.delete("/api/articles/" + id))
                .andExpect(status().isNotFound())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), ErrorMessage.class);

        // Then
        assertEquals("Article with id " + id + " not found.", result.errorMsg());
    }

    @Test
    void deleteArticleById_whenSuchWorld_thenDeleteAndReturnDeleted() throws Exception {
        // Given
        ArticleDto articleDto = new ArticleDto("Content", List.of("NpcId1", "NpcId2"));

        MvcResult articleJson = mvc.perform(MockMvcRequestBuilders.post("/api/articles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(articleDto)))
                .andExpect(status().isCreated())
                .andReturn();

        Article expectedArticle = objectMapper.readValue(articleJson.getResponse().getContentAsString(), Article.class);

        // When
        MvcResult resultArticleJson = mvc.perform(MockMvcRequestBuilders.delete("/api/articles/" + expectedArticle.id()))
                .andExpect(status().isOk())
                .andReturn();

        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.get("/api/articles/" + expectedArticle.id()))
                .andExpect(status().isNotFound())
                .andReturn();

        Article resultArticle = objectMapper.readValue(resultArticleJson.getResponse().getContentAsString(), Article.class);
        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), ErrorMessage.class);

        // Then
        assertEquals(expectedArticle, resultArticle);
        assertEquals("Article with id " + expectedArticle.id() + " not found.", result.errorMsg());
    }
}
