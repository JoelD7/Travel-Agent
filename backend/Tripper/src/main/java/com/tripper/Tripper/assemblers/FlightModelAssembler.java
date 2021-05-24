package com.tripper.Tripper.assemblers;

import com.tripper.Tripper.controllers.FlightController;
import com.tripper.Tripper.models.Flight;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;
import org.springframework.stereotype.Component;

@Component
@Lazy
public class FlightModelAssembler implements RepresentationModelAssembler<Flight, EntityModel<Flight>> {

    @Override
    public EntityModel<Flight> toModel(Flight entity) {
        Long idPerson = entity.getPerson().getIdPerson();

        return EntityModel.of(entity,
                linkTo(methodOn(FlightController.class).getFlight(entity.getIdFlight())).withSelfRel(),
                linkTo(methodOn(FlightController.class).bookFlight(entity, idPerson)).withRel("bookFlight"));
    }

    @Override
    public CollectionModel<EntityModel<Flight>> toCollectionModel(Iterable<? extends Flight> entities) {
        List<EntityModel<Flight>> entityModels
                = StreamSupport.stream(entities.spliterator(), false)
                        .map(this::toModel)
                        .collect(Collectors.toList());

        return CollectionModel.of(entityModels,
                linkTo(methodOn(FlightController.class).getAllFlights(null)).withSelfRel());
    }

}
