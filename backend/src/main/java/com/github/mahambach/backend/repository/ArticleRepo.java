package com.github.mahambach.backend.repository;

import com.github.mahambach.backend.model.Article;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ArticleRepo extends MongoRepository<Article, String>{
}
