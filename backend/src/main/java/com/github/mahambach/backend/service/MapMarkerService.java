package com.github.mahambach.backend.service;

import com.github.mahambach.backend.exception.MissMatchingIdsMapMarkerException;
import com.github.mahambach.backend.exception.NoSuchMapMarkerException;
import com.github.mahambach.backend.model.ArticleDto;
import com.github.mahambach.backend.model.MapMarker;
import com.github.mahambach.backend.model.MapMarkerDto;
import com.github.mahambach.backend.repository.MapMarkerRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MapMarkerService {
    private final MapMarkerRepo mapMarkerRepo;
    private final ArticleService articleService;

    public List<MapMarker> getAllMapMarkers() {
        return mapMarkerRepo.findAll();
    }

    public MapMarker getMapMarkerById(String mapMarkerId) {
        return mapMarkerRepo
                .findById(mapMarkerId)
                .orElseThrow(() -> new NoSuchMapMarkerException(mapMarkerId));
    }

    public MapMarker createMapMarker(MapMarkerDto mapMarkerDto) {
        String articleId = articleService.createArticle(new ArticleDto("", List.of())).id();
        return mapMarkerRepo.save(new MapMarker(mapMarkerDto).withArticleId(articleId));
    }

    public MapMarker updateMapMarker(String mapMarkerId, MapMarker mapMarker) {
        if(!mapMarkerId.equals(mapMarker.id())) {
            throw new MissMatchingIdsMapMarkerException(mapMarkerId, mapMarker.id());
        }
        if(!mapMarkerRepo.existsById(mapMarker.id())) {
            throw new NoSuchMapMarkerException(mapMarker.id());
        }

        return mapMarkerRepo.save(mapMarker);
    }

    public MapMarker deleteMapMarkerById(String mapMarkerId) {
        MapMarker mapMarker = getMapMarkerById(mapMarkerId);
        mapMarkerRepo.deleteById(mapMarkerId);
        return mapMarker;
    }

}
