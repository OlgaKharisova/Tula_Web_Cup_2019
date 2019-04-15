package com.github.olgakharisova.model.entity;

import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
public class PageResponse {

    private List<ImageMeta> metas;

    private long totalPages;

//    private long totalElements;
//    private int pageNumber;
//    private int pageSize;

    public PageResponse(Page<ImageMeta> page) {
        this.metas = page.getContent();
        this.totalPages = page.getTotalPages();
//        this.totalElements = page.getTotalElements();
//        this.pageSize = page.getSize();
//        this.pageNumber = page.getNumber();
    }
}
