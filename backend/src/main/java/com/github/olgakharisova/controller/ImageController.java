package com.github.olgakharisova.controller;

import com.github.olgakharisova.exception.ResourceNotFoundException;
import com.github.olgakharisova.model.entity.ImageMeta;
import com.github.olgakharisova.model.entity.Rating;
import com.github.olgakharisova.model.request.NewImageRequest;
import com.github.olgakharisova.service.ImageMetaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.io.IOException;
import java.util.UUID;

/**
 * Контроллер для работы с двоичными большими объектами
 */
@RestController
@RequestMapping("/api")
@Slf4j
@Validated
public class ImageController {

    @Autowired
    private ImageMetaService imageService;

    /**
     * Загрузка изображения на сервер
     * @param request
     * @return
     * @throws IOException
     */
    @PostMapping("upload")
    public @ResponseBody UUID uploadImage(@ModelAttribute /*@Valid*/ NewImageRequest request) throws IOException {
        log.info("upload");
        return imageService.putImage(request);
    }

    /**
     * Скачивание изображения с сервера
     * @param imageId
     * @return
     */
    @GetMapping(value = "download/{imageId}", produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] downloadImage(@PathVariable UUID imageId) {
        log.info("download");
        return imageService.getImageBlob(imageId)
                .orElseThrow(() -> new ResourceNotFoundException(imageId));
    }

    /**
     * Получение метаинформации изображения
     * @param imageId
     * @return
     */
    @GetMapping("meta/{imageId}")
    public ImageMeta getMeta(@PathVariable UUID imageId) {
        log.info("meta");
        return imageService.getImageMeta(imageId).orElseThrow(
                () -> new ResourceNotFoundException(imageId)
        );
    }

    /**
     * Засчитать оценку
     * @param imageId
     * @return
     */
    @PostMapping("vote/{imageId}")
    public @ResponseBody Rating applyVoice(@PathVariable UUID imageId, @Valid @Min(1) @Max(5) Long voteValue) {
        log.info("vote");
        return imageService.applyVoice(imageId, voteValue)
                .orElseThrow(() -> new ResourceNotFoundException(imageId));
    }

}
