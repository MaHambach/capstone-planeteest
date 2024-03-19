package com.github.mahambach.backend.repository;

import com.github.mahambach.backend.model.MapMarker;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MapMarkerRepo extends MongoRepository<MapMarker, String> {
}
