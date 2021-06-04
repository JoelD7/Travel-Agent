package com.tripper.Tripper.data;

import com.tripper.Tripper.models.Restaurant;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    public Optional<Restaurant> findByName(String name);
}
