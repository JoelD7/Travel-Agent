package com.tripper.Tripper.models;

import com.tripper.Tripper.models.enums.FavoritePlace;
import java.io.Serializable;
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
public class Favorite implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idFavorite")
    private Long idFavorite;

    private String code;
    private FavoritePlace type;

    @ManyToOne
    @JoinColumn(name = "idPerson")
    private Person person;

}
