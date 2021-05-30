package com.tripper.Tripper.data;

import com.tripper.Tripper.models.CarRental;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRentalRepository extends JpaRepository<CarRental, Long> {

}
