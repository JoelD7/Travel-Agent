package com.tripper.Tripper.data;

import com.tripper.Tripper.models.HotelReservation;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface HotelReservationRepository extends JpaRepository<HotelReservation, Long> {

    @Query("select hr from HotelReservation hr where hr.person.uuid= :uuid")
    public List<HotelReservation> getAllHotelReservationsByPerson(@Param("uuid") String uuid);
}
