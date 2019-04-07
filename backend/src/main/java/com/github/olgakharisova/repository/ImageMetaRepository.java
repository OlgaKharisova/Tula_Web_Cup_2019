package com.github.olgakharisova.repository;

import com.github.olgakharisova.model.entity.ImageMeta;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface ImageMetaRepository extends PagingAndSortingRepository<ImageMeta, UUID> {
}
