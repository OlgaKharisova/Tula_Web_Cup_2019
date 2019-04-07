package com.github.olgakharisova.service;

import com.github.olgakharisova.model.entity.ImageMeta;
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
import java.util.List;
import java.util.Optional;
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
        if(maybeImageMeta.isPresent()) {
            ImageMeta imageMeta = maybeImageMeta.get();
            Rating rating = Optional.ofNullable(imageMeta.getRating()).orElseGet(Rating::new);
            imageMetaRepository.save(imageMeta.setRating(rating.compute(newVote)));
            return Optional.of(rating);
        } else {
            return Optional.empty();
        }
    }

    public List<ImageMeta> getImageMetaBatch(@Nullable Integer pageNumber,
                                             @Nullable Integer size,
                                             @Nullable String sortingField,
                                             @Nullable Sort.Direction direction) {
        pageNumber = Optional.ofNullable(pageNumber).orElse(1) - 1;
        size = Optional.ofNullable(size).orElse(Integer.MAX_VALUE);
        direction = Optional.ofNullable(direction).orElse(Sort.Direction.DESC);
        sortingField = Optional.ofNullable(sortingField).orElse("createdAt");
        PageRequest of = PageRequest.of(pageNumber, size, Sort.by(direction, sortingField));
        return imageMetaRepository.findAll(of).getContent();

    }
}
