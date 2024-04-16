package com.github.mahambach.backend.exception;

import lombok.Getter;

@Getter
public class UserWithNameAlreadyExistsException extends RuntimeException {

    public UserWithNameAlreadyExistsException(String userName) { super(userName); }
}
