package com.tripper.Tripper.data;

import com.tripper.Tripper.models.POI;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PoiRepository extends JpaRepository<POI, Long> {

    public Optional<POI> findByName(String name);
}
