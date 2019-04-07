package com.github.olgakharisova.repository;


import com.github.olgakharisova.exception.ServerException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.Serializable;
import java.nio.file.*;
import java.util.Optional;

@Service
@Slf4j
public class FileSystemBlobRepository implements BlobRepository {

    @Value("${app.fs.dir}")
    private String workDir;

    @Override
    public Optional<byte[]> getBlob(Serializable id) {
        Path pathToBlob = Paths.get(workDir, id.toString());
        try {
            return Optional.of(Files.readAllBytes(pathToBlob));
        } catch (IOException e) {
            log.warn(e.getMessage());
            return Optional.empty();
        }
    }

    @Override
    public void saveBlob(Serializable id, byte[] content) throws ServerException {
        Path pathToBlob = Paths.get(workDir, id.toString());
        try {
            Files.write(pathToBlob, content, StandardOpenOption.CREATE_NEW);
        } catch (IOException e) {
            throw new ServerException(e);
        }
    }
}
