package com.github.olgakharisova.repository;

import com.github.olgakharisova.model.entity.ImageMeta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface ImageMetaRepository extends JpaRepository<ImageMeta, UUID>, JpaSpecificationExecutor<ImageMeta> { }
