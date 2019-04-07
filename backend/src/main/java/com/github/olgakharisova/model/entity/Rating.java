package com.github.olgakharisova.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonIgnore
    private Long id;

    @OneToOne
    @JsonIgnore
    private ImageMeta meta;

    private long totalVotes;

    private double value;

    public Rating compute(Long newVote) {
        value = (value * totalVotes + newVote) / ++totalVotes;
        return this;
    }
}
