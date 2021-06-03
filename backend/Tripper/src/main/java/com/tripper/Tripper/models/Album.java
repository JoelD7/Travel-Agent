package com.tripper.Tripper.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idAlbum")
    private Long idAlbum;

    private String name;
    private String cover;

    @ManyToOne
    @JoinColumn(name = "idTrip")
    @JsonBackReference(value = "albumReference")
    private Trip trip;

    @OneToMany(mappedBy = "album", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "pictureReference")
    private List<Picture> pictures = new ArrayList<>();
}
