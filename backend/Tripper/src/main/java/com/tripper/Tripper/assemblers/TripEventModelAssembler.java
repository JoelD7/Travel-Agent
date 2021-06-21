package com.tripper.Tripper.assemblers;

import com.tripper.Tripper.controllers.TripEventController;
import com.tripper.Tripper.models.TripEvent;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;
import org.springframework.stereotype.Component;

@Component
public class TripEventModelAssembler implements RepresentationModelAssembler<TripEvent, EntityModel<TripEvent>> {

    @Override
    public EntityModel<TripEvent> toModel(TripEvent entity) {
        String tripUuid = entity.getTrip().getUuid();

        return EntityModel.of(entity,
                linkTo(methodOn(TripEventController.class).getTripEvent(entity.getUuid())).withSelfRel(),
                linkTo(methodOn(TripEventController.class).getAllOfTrip(tripUuid)).withRel("eventsOfTrip"),
                linkTo(methodOn(TripEventController.class).addEventToTrip(entity, tripUuid)).withRel("addEvent"),
                linkTo(methodOn(TripEventController.class).deleteEvent(entity.getUuid())).withRel("deleteEvent")
        );
    }

    @Override
    public CollectionModel<EntityModel<TripEvent>> toCollectionModel(Iterable<? extends TripEvent> entities) {
        List<EntityModel<TripEvent>> entityModels
                = StreamSupport.stream(entities.spliterator(), false)
                        .map(this::toModel)
                        .collect(Collectors.toList());

        return CollectionModel.of(entityModels,
                linkTo(methodOn(TripEventController.class).getAllOfTrip(null)).withSelfRel()
        );
    }

}
