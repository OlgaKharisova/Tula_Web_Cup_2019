package com.github.olgakharisova.repository;

import java.io.Serializable;
import java.util.Optional;


public interface BlobRepository {

    Optional<byte[]> getBlob(Serializable id);

    void saveBlob(Serializable id, byte[] content);

}
