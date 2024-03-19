package com.github.mahambach.backend.model;

import org.springframework.data.annotation.Id;

import java.util.List;

public record Article(
        @Id String id,
        String content,
        List<String> npcIds
) {
    public Article(ArticleDto articleDto) {
        this(null, articleDto.content(), articleDto.npcIds());
    }
}
