package com.github.mahambach.backend.repository;

import com.github.mahambach.backend.model.MapMarkerType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MapMarkerTypeRepo extends MongoRepository<MapMarkerType, String> {
}
