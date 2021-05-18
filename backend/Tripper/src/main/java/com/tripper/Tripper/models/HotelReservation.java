package com.tripper.Tripper.models;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
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
public class HotelReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idHotelReservation")
    private Long idHotelReservation;

    @ManyToOne
    @JoinColumn(name = "idPerson")
    private Person person;

    private String hotelCode;
    private String name;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Integer stars;
    private Integer adults;
    private Integer children;
    private String address;
    private String phoneNumber;

    @OneToMany(mappedBy = "hotelReservation")
    private List<HotelRoom> hotelRooms = new ArrayList<>();

}
