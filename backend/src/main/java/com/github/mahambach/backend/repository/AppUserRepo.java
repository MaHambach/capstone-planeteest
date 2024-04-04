package com.github.mahambach.backend.repository;

import com.github.mahambach.backend.model.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AppUserRepo extends MongoRepository<AppUser, String> {
    Optional<AppUser> findAppUserByUsername(String username);
}
