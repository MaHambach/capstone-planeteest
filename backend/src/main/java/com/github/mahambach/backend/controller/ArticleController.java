package com.github.mahambach.backend.controller;

import com.github.mahambach.backend.model.Article;
import com.github.mahambach.backend.model.ArticleDto;
import com.github.mahambach.backend.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {
    private final ArticleService articleService;


    @GetMapping
    public List<Article> getAllArticles() {
        return articleService.getAllArticles();
    }

    @GetMapping("/{articleId}")
    public Article getArticleById(@PathVariable String articleId) {
        return articleService.getArticleById(articleId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Article createArticle(@RequestBody ArticleDto articleDto) {
        return articleService.createArticle(articleDto);
    }

    @PutMapping("/{articleId}")
    public Article updateArticle(@PathVariable String articleId, @RequestBody Article article) {
        return articleService.updateArticle(articleId, article);
    }

    @DeleteMapping("/{articleId}")
    public Article deleteArticleById(@PathVariable String articleId) {
        return articleService.deleteArticleById(articleId);
    }
}
