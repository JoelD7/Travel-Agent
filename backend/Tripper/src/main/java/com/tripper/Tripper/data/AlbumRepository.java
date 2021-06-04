package com.tripper.Tripper.data;

import com.tripper.Tripper.models.Album;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AlbumRepository extends JpaRepository<Album, Long> {

    @Query("select a from Album a where a.trip.idTrip = :idTrip")
    public List<Album> findByTrip(@Param("idTrip") Long idTrip);
}
