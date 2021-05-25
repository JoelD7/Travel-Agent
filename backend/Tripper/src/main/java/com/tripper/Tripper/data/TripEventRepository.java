package com.tripper.Tripper.data;

import com.tripper.Tripper.models.TripEvent;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TripEventRepository extends JpaRepository<TripEvent, Long> {

    @Query("select te from TripEvent te where te.trip.idTrip = :idTrip")
    public List<TripEvent> getAllEventsOfTrip(@Param("idTrip") Long id);
}
