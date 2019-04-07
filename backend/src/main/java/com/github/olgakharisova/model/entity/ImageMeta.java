package com.github.olgakharisova.model.entity;

import lombok.Data;
import lombok.experimental.Accessors;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Set;
import java.util.UUID;

@Entity
@Data
@Accessors(chain = true)
public class ImageMeta {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private UUID uuid;

    @ManyToMany(cascade = CascadeType.ALL)
    private Set<Tag> tags;

    @OneToOne(cascade = CascadeType.ALL)
    private Rating rating;

    private String originalName;

    @Column(updatable = false)
    private long createdAt = System.currentTimeMillis() / 1000;

}
