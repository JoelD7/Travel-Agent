package com.tripper.Tripper.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@NoArgsConstructor
public class POI {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idPoi")
    private Long idPoi;

    @OneToOne
    @JoinColumn(name = "idEvent")
    @JsonBackReference(value = "poiReference")
    @Setter(AccessLevel.PRIVATE)
    private TripEvent event;

    @OneToOne
    @JoinColumn(name = "idFavorite")
    @JsonBackReference(value = "poiFavReference")
    @Setter(AccessLevel.PRIVATE)
    private Favorite favorite;

    private String id;
    private String name;
    private LocalDateTime visitDate;
    private String formattedAddress;
    private String imageUrl;
    private Integer rating;
    private String category;
    private String categoryIconUrl;

    public void setTripEvent(TripEvent event) {
        this.setEvent(event);
        event.setPoi(this);
    }

    public void setFavoritePOI(Favorite favorite) {
        this.setFavorite(favorite);
        favorite.setPoi(this);
    }
}
