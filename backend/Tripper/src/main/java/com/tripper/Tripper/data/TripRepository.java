package com.tripper.Tripper.data;

import com.tripper.Tripper.models.Trip;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {

    @Query("select t from Trip t where t.person.idPerson = :idPerson")
    public List<Trip> findByPerson(@Param("idPerson") Long idPerson);
}
