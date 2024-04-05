package com.github.mahambach.backend.exception;

import java.util.NoSuchElementException;

public class NoSuchAppUserException extends NoSuchElementException {
    public NoSuchAppUserException(String userId) {
        super(userId);
    }
}
