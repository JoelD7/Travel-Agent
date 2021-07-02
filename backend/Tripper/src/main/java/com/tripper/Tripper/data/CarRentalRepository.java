package com.tripper.Tripper.data;

import com.tripper.Tripper.models.CarRental;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CarRentalRepository extends JpaRepository<CarRental, Long> {

    @Query("select cr from CarRental cr where cr.person.uuid = :uuid")
    public List<CarRental> findAllByPerson(String uuid);
}
