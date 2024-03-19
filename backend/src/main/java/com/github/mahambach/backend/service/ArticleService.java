package com.github.mahambach.backend.service;

import com.github.mahambach.backend.exception.MissMatchingIdsArticleException;
import com.github.mahambach.backend.exception.NoSuchArticleException;
import com.github.mahambach.backend.model.Article;
import com.github.mahambach.backend.model.ArticleDto;
import com.github.mahambach.backend.repository.ArticleRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepo articleRepo;

    public List<Article> getAllArticles() {
        return articleRepo.findAll();
    }

    public Article getArticleById(String articleId) {
        return articleRepo
                .findById(articleId)
                .orElseThrow(() -> new NoSuchArticleException(articleId));
    }

    public Article createArticle(ArticleDto articleDto) {
        return articleRepo.save(new Article(articleDto));
    }

    public Article updateArticle(String articleId, Article article) {
        if(!articleId.equals(article.id())){
            throw new MissMatchingIdsArticleException(articleId, article.id());
        }
        if(!articleRepo.existsById(article.id())) {
            throw new NoSuchArticleException(article.id());
        }

        return articleRepo.save(article);
    }

    public Article deleteArticleById(String articleId) {
        if(!articleRepo.existsById(articleId)) {
            throw new NoSuchArticleException(articleId);
        }
        Article article = getArticleById(articleId);
        articleRepo.deleteById(articleId);
        return article;
    }
}
