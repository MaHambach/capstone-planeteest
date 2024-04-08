package com.github.mahambach.backend.repository;

import com.github.mahambach.backend.model.WorldMapInvite;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorldMapInviteRepo extends MongoRepository<WorldMapInvite, String> {
}
