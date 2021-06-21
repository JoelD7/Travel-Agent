package com.tripper.Tripper.data;

import com.tripper.Tripper.models.Person;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {

    Optional<Person> findByEmail(String email);

    Optional<Person> findByUuid(String uuid);

    Boolean existsByEmail(String email);
}
