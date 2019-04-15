package com.github.olgakharisova.model.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.util.Set;


@Data
public class NewImageRequest {

    private Set<String> tags;

    @NotNull
    private MultipartFile file;

}
