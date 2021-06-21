package com.tripper.Tripper.data;

import com.tripper.Tripper.models.Album;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AlbumRepository extends JpaRepository<Album, Long> {

    @Query("select a from Album a where a.trip.uuid = :tripUuid")
    public List<Album> findByTrip(@Param("tripUuid") String tripUuid);

    public Optional<Album> findByUuid(String uuid);

}
