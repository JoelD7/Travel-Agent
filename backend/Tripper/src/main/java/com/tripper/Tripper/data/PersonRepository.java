package com.tripper.Tripper.data;

import com.tripper.Tripper.models.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {

}
