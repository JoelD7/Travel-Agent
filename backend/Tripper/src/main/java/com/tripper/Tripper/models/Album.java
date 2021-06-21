package com.tripper.Tripper.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@NoArgsConstructor
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idAlbum")
    @JsonIgnore
    private Long idAlbum;
    private String uuid;

    private String name;
    private String cover;

    @ManyToOne
    @JoinColumn(name = "idTrip")
    @JsonBackReference(value = "albumReference")
    private Trip trip;

    @OneToMany(mappedBy = "album", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "pictureReference")
    @Setter(AccessLevel.PRIVATE)
    @OrderBy("date ASC")
    private List<Picture> pictures = new ArrayList<>();

    public void setAlbumPictures(List<Picture> pictures) {
        List<Picture> albumAwarePictures = pictures
                .stream()
                .map(picture -> {
                    picture.setAlbum(this);
                    return picture;
                })
                .collect(Collectors.toList());

        this.setPictures(albumAwarePictures);
    }
}
