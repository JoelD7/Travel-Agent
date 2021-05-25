package com.tripper.Tripper.data.specifications;

import com.tripper.Tripper.models.Flight;
import com.tripper.Tripper.models.Person;
import org.springframework.data.jpa.domain.Specification;

public class FlightRepositorySpecs {

    public static Specification<Flight> hasIdPerson(Long idPerson) {
        return ((root, criteriaQuery, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get("person").<Person>get("idPerson"), idPerson);
        });
    }
}
