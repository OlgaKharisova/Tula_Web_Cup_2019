package com.github.olgakharisova.model.request;

import com.github.olgakharisova.model.entity.Tag;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.util.Set;


@Data
public class NewImageRequest {

    @NotNull
    private Set<Tag> tags;

    @NotNull
    private MultipartFile file;

}
