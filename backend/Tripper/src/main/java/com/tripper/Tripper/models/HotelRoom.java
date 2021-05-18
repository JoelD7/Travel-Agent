package com.tripper.Tripper.models;

import java.sql.Blob;
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
public class HotelRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idHotelRoom")
    private Long idHotelRoom;

    private String code;
    private String name;
    private Blob image;
    private Double totalAmount;

    @ManyToOne
    @JoinColumn(name = "idHotelReservation")
    private HotelReservation hotelReservation;
}
