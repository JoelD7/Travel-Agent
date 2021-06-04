package com.tripper.Tripper.data;

import com.tripper.Tripper.models.CarRental;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CarRentalRepository extends JpaRepository<CarRental, Long> {

    @Query("select cr from CarRental cr where cr.person.idPerson = :idPerson")
    public List<CarRental> findAllByPerson(@Param("idPerson") Long idPerson);
}