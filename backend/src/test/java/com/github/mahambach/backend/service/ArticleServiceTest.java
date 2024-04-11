package com.github.mahambach.backend.service;

import com.github.mahambach.backend.exception.MissMatchingIdsArticleException;
import com.github.mahambach.backend.exception.NoSuchArticleException;
import com.github.mahambach.backend.model.Article;
import com.github.mahambach.backend.model.ArticleDto;
import com.github.mahambach.backend.repository.ArticleRepo;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ArticleServiceTest {
    private final ArticleRepo articleRepo = mock(ArticleRepo.class);

    private final ArticleService articleService = new ArticleService(articleRepo);

    // getAllArticles()
    @Test
    void getAllArticles_whenOneArticle_thenReturnListOfArticle() {
        // Given
        Article article = new Article("1", "Content", List.of("NpcId1", "NpcId2"));
        List<Article> expected = List.of(article);

        // When
        when(articleRepo.findAll()).thenReturn(expected);
        List<Article> actual = articleService.getAllArticles();

        // Then
        assertEquals(expected, actual);
        verify(articleRepo).findAll();
        verifyNoMoreInteractions(articleRepo);
    }

    @Test
    void getAllArticles_whenEmpty_thenEmpty() {
        // Given
        List<Article> expected = List.of();

        // When
        when(articleRepo.findAll()).thenReturn(expected);
        List<Article> actual = articleService.getAllArticles();

        // Then
        assertEquals(expected, actual);
        verify(articleRepo).findAll();
        verifyNoMoreInteractions(articleRepo);
    }

    // getArticleById(String articleId)
    @Test
    void getArticleById_whenNoSuchArticle_thenThrow() {
        // Given
        String id = "1";

        // When
        when(articleRepo.findById(id)).thenReturn(java.util.Optional.empty());


        // Then
        assertThrows(NoSuchArticleException.class, () -> articleService.getArticleById(id));
        verify(articleRepo).findById(id);
        verifyNoMoreInteractions(articleRepo);
    }

    @Test
    void getArticleById_whenSuchArticle_thenReturn()  {
        // Given
        String id = "1";
        Article expected = new Article(id, "Content", List.of("NpcId1", "NpcId2"));

        // When
        when(articleRepo.findById(id)).thenReturn(java.util.Optional.of(expected));
        Article result = articleService.getArticleById(id);

        // Then
        assertEquals(expected, result);
        verify(articleRepo).findById(id);
        verifyNoMoreInteractions(articleRepo);
    }


    // createArticle(ArticleDto articleDto)
    @Test
    void createArticle_whenValidInput_thenCreateAndReturn() {
        // Given
        String id = "1";
        Article expected = new Article(id, "Content", List.of("NpcId1", "NpcId2"));
        ArticleDto input = new ArticleDto("Content", List.of("NpcId1", "NpcId2"));

        // When
        when(articleRepo.save(new Article(input))).thenReturn(expected);
        Article result = articleService.createArticle(input);

        // Then
        assertEquals(expected, result);
    }

    // updateArticle(String articleId, Article article)
    @Test
    void updateArticle_whenNoSuchArticle_thenThrow() {
        // Given
        String id = "1";
        Article article = new Article("1", "Content", List.of("NpcId1", "NpcId2"));

        // When
        when(articleRepo.existsById(id)).thenReturn(false);

        // Then
        assertThrows(NoSuchArticleException.class, () -> articleService.updateArticle(id, article));
        verify(articleRepo).existsById(id);
        verifyNoMoreInteractions(articleRepo);
    }

    @Test
    void updateArticle_whenPathAndBodyIdDiffer_thenThrow() {
        // Given
        String id = "1";
        Article article = new Article("2", "Content", List.of("NpcId1", "NpcId2"));

        // When
        // Then
        assertThrows(MissMatchingIdsArticleException.class, () -> articleService.updateArticle(id, article));
        verifyNoInteractions(articleRepo);
    }

    @Test
    void updateArticle_whenSuchArticle_thenUpdateAndReturn() {
        // Given
        Article articleOld = new Article("1", "Content", List.of("NpcId1", "NpcId2"));
        Article expected = articleOld.withContent("ContentNew").withNpcIds(List.of("NpcId1New", "NpcId2New"));

        // When
        when(articleRepo.existsById(articleOld.id())).thenReturn(true);
        when(articleRepo.save(expected)).thenReturn(expected);
        Article actual = articleService.updateArticle(articleOld.id(), expected);

        // Then
        assertEquals(expected, actual);
        verify(articleRepo).existsById(articleOld.id());
        verify(articleRepo).save(expected);
        verifyNoMoreInteractions(articleRepo);
    }

    // deleteArticleById(String articleId)
    @Test
    void deleteArticleById_whenNoSuchArticle_thenThrow() {
        // Given
        String id = "1";

        // When
        when(articleRepo.findById(id)).thenReturn(java.util.Optional.empty());

        // Then
        assertThrows(NoSuchArticleException.class, () -> articleService.deleteArticleById(id));
        verify(articleRepo).findById(id);
        verifyNoMoreInteractions(articleRepo);
    }

    @Test
    void deleteArticleById_whenSuchWorld_thenDeleteAndReturnDeleted() {
        // Given
        Article expected = new Article("1", "Content", List.of("NpcId1", "NpcId2"));

        // When
        when(articleRepo.findById(expected.id())).thenReturn(java.util.Optional.of(expected));
        Article actual = articleService.deleteArticleById(expected.id());

        // Then
        assertEquals(expected, actual);
        verify(articleRepo).findById(expected.id());
        verify(articleRepo).deleteById(expected.id());
        verifyNoMoreInteractions(articleRepo);
    }
}
