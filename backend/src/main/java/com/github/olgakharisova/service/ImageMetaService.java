package com.github.olgakharisova.service;

import com.github.olgakharisova.model.entity.ImageMeta;
import com.github.olgakharisova.model.entity.Rating;
import com.github.olgakharisova.model.request.NewImageRequest;
import com.github.olgakharisova.repository.BlobRepository;
import com.github.olgakharisova.repository.ImageMetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
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
}
