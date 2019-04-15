package com.github.olgakharisova.service;

import com.github.olgakharisova.model.entity.ImageMeta;
import com.github.olgakharisova.model.entity.PageResponse;
import com.github.olgakharisova.model.entity.Rating;
import com.github.olgakharisova.model.request.NewImageRequest;
import com.github.olgakharisova.repository.BlobRepository;
import com.github.olgakharisova.repository.ImageMetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
public class ImageMetaService {

    @Autowired
    private ImageMetaRepository imageMetaRepository;

    @Autowired
    private BlobRepository blobRepository;

    public UUID putImage(NewImageRequest imageRequest) throws IOException {
        ImageMeta meta = new ImageMeta()
                .setOriginalName(imageRequest.getFile().getOriginalFilename())
                .setRating(null)
                .setTags(imageRequest.getTags());
        imageMetaRepository.save(meta);
        blobRepository.saveBlob(meta.getUuid(), imageRequest.getFile().getBytes());
        return meta.getUuid();
    }

    public Optional<byte[]> getImageBlob(UUID imageId) {
        return blobRepository.getBlob(imageId);
    }

    public Optional<ImageMeta> getImageMeta(UUID imageId) {
        return imageMetaRepository.findById(imageId);
    }

    @Transactional
    public Optional<Rating> applyVoice(UUID imageId, Long newVote) {
        Optional<ImageMeta> maybeImageMeta = imageMetaRepository.findById(imageId);
        if (maybeImageMeta.isPresent()) {
            ImageMeta imageMeta = maybeImageMeta.get();
            Rating rating = Optional.ofNullable(imageMeta.getRating()).orElseGet(Rating::new);
            imageMetaRepository.save(imageMeta.setRating(rating.compute(newVote)));
            return Optional.of(rating);
        } else {
            return Optional.empty();
        }
    }

    public PageResponse getImageMetaBatch(@Nullable Integer pageNumber,
                                          @Nullable Integer pageSize,
                                          @Nullable String sortingField,
                                          @Nullable Sort.Direction direction,
                                          @Nullable Set<String> tags) {
        pageNumber = Optional.ofNullable(pageNumber).orElse(1) - 1;
        pageSize = Optional.ofNullable(pageSize).orElse(Integer.MAX_VALUE);
        direction = Optional.ofNullable(direction).orElse(Sort.Direction.DESC);
        sortingField = Optional.ofNullable(sortingField).orElse("createdAt");
        Specification<ImageMeta> spec = Optional.ofNullable(tags)
                .orElseGet(Collections::emptySet)
                .stream()
                .map(String::toLowerCase)
                .map(this::tagWithin)
                .reduce(Specification.where(null), (acc, elem) -> acc = acc.and(elem));
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, Sort.by(direction, sortingField));
        return new PageResponse(imageMetaRepository.findAll(spec, pageRequest));
    }

    private Specification<ImageMeta> tagWithin(String tag) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.isMember(tag, root.get("tags"));
    }
}
