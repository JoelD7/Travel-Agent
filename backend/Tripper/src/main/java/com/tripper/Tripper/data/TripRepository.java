package com.tripper.Tripper.data;

import com.tripper.Tripper.models.Trip;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {

    @Query("select t from Trip t where t.person.uuid = :uuid")
    public List<Trip> findByPerson(@Param("uuid") String uuid);

    public Optional<Trip> findByUuid(String uuid);
}
