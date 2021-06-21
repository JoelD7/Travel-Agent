package com.tripper.Tripper.assemblers;

import com.tripper.Tripper.controllers.TripController;
import com.tripper.Tripper.models.Trip;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;
import org.springframework.stereotype.Component;

@Component
public class TripModelAssembler implements RepresentationModelAssembler<Trip, EntityModel<Trip>> {

    @Override
    public EntityModel<Trip> toModel(Trip trip) {
        Long idPerson = trip.getPerson().getIdPerson();
        return EntityModel.of(trip,
                linkTo(methodOn(TripController.class).getTrip(trip.getUuid())).withSelfRel(),
                linkTo(methodOn(TripController.class).getAllTrips(idPerson)).withRel("trips"));
    }

    @Override
    public CollectionModel<EntityModel<Trip>> toCollectionModel(Iterable<? extends Trip> entities) {
        List<EntityModel<Trip>> entityModels
                = StreamSupport.stream(entities.spliterator(), false)
                        .map(this::toModel)
                        .collect(Collectors.toList());

        return CollectionModel.of(entityModels,
                linkTo(methodOn(TripController.class).getAllTrips(null)).withSelfRel()
        );
    }

}
