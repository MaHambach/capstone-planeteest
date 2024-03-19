package com.github.mahambach.backend.model;

import java.util.List;

public record ArticleDto(
        String content,
        List<String> npcIds
) {
}
