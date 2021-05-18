package com.tripper.Tripper.models;

import java.sql.Blob;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Picture {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idPicture")
    private Long idPicture;

    private Blob picture;
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "idAlbum")
    private Album album;
}
