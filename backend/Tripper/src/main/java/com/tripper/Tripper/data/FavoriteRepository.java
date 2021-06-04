package com.tripper.Tripper.data;

import com.tripper.Tripper.models.Favorite;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    @Query("select f from Favorite f where f.person.idPerson = :idPerson")
    public List<Favorite> getAllByPerson(@Param("idPerson") Long idPerson);

    @Query("select f from Favorite f where f.code = :code")
    public Optional<Favorite> findByCode(@Param("code") String code);
}
