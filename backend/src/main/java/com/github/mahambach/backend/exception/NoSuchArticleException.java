package com.github.mahambach.backend.exception;

import java.util.NoSuchElementException;

public class NoSuchArticleException extends NoSuchElementException {
    public NoSuchArticleException(String articleId) {
        super(articleId);
    }
}
