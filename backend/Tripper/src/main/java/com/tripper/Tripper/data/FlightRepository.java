package com.tripper.Tripper.data;

import com.tripper.Tripper.models.Flight;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface FlightRepository extends JpaRepository<Flight, Long>, JpaSpecificationExecutor<Flight> {

    @Query("select f from Flight f where f.person.uuid = :uuid")
    public List<Flight> findAllOfPerson(String uuid);
}
