package com.tripper.Tripper.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import java.time.LocalDate;
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
    @JsonBackReference
    private Person person;

    private Integer hotelCode;
    private String name;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Integer stars;
    private Integer adults;
    private Integer children;
    private String address;
    private String phoneNumber;
    private String hotelImage;

    @OneToMany(mappedBy = "hotelReservation", cascade = CascadeType.ALL)
    private List<HotelRoom> rooms = new ArrayList<>();

    public static void persistHotelReservation(HotelReservation hotelRsv) {
        List<HotelRoom> rooms = hotelRsv.getRooms()
                .stream()
                .map(room -> {
                    room.setHotelReservation(hotelRsv);
                    return room;
                })
                .collect(Collectors.toList());

        hotelRsv.setRooms(rooms);
    }
}
