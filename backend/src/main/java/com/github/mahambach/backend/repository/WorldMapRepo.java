package com.github.mahambach.backend.repository;

import com.github.mahambach.backend.model.WorldMap;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorldMapRepo extends MongoRepository<WorldMap, String> {
}
